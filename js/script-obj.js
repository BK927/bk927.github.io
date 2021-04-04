import { generateHash } from "/js/md5.min.js";

export const LangEnum = Object.freeze({ ko: 0, en: 1, jp: 2 });

const KO_DATE_REGEX = /(?<=\r?\n)\d{4}년\s\d{1,2}월\s\d{1,2}일\s((오전)|(오후))\s\d{1,2}:\d{1,2}(?=,)/g;
const KO_NAME_REGEX = /(?<=(\d{4}년\s\d{1,2}월\s\d{1,2}일\s((오전)|(오후))\s\d{1,2}:\d{1,2},\s)).+?(?=\s:\s)/g;
const KO_CHATTING_REGEX = /(?<=(\d{4}년\s\d{1,2}월\s\d{1,2}일\s((오전)|(오후))\s\d{1,2}:\d{1,2},\s.+\s:\s)).+/g;
const KO_CHATTING_AND_NAME_REGEX = /(?<=(\d{4}년\s\d{1,2}월\s\d{1,2}일\s((오전)|(오후))\s\d{1,2}:\d{1,2},\s))[\s\S]+?(?=\r?\n\d{4}년)/g;

const KO_PHOTO_REGEX = /\s:\s사진\r?\n/g;
const KO_VIDEO_REGEX = /\s:\s동영상\r?\n/g;
const KO_EMOJI_REGEX = /\s:\s이모티콘\r?\n/g;
const YOUTUBE_LINK_REGEX = /(https:\/\/youtu\.be\/.+)|(https:\/\/www\.youtube\.com\/.+)/g;

export function createScriptObj(content) {
  //Private Method
  const countMatchToRegex = function (str, regex) {
    return ((str || "").match(regex) || []).length;
  };

  const getTypingRanking = function (script) {
    const chattingArray = script.match(KO_CHATTING_AND_NAME_REGEX);
    let rankingMap = new Map();

    for (let i = 0; i < chattingArray.length; i++) {
      if (
        /This message has been hidden by the chatroom managers\./g.test(chattingArray[i]) ||
        /님이 나갔습니다\./g.test(chattingArray[i]) ||
        /방장이 .+?님에서 .+?님으로 변경되었습니다.\r?\n.+?님은 참여자 관리와 채팅방 관리에 신경써주세요!/g.test(chattingArray[i]) ||
        /.+?이 들어왔습니다\./g.test(chattingArray[i])
      ) {
        continue;
      }

      try{
        const nickname = chattingArray[i].match(/^(.+?)(?=\s:\s)/gm)[0];
        const chatting = chattingArray[i].match(/(?<=.+?\s:\s)[\s\S]+/g)[0];
        
        if (rankingMap.has(nickname)) {
          rankingMap.set(nickname, rankingMap.get(nickname) + chatting.length);
        } else {
          rankingMap.set(nickname, chatting.length);
        }
      }
      catch (e) {
        console.error(e);
        continue;
      }
    }

    const arrForSort = Array.from(rankingMap);
    arrForSort.sort(function (first, second) {
      return second[1] - first[1];
    });
    return arrForSort;
  };

  const countDayFrequency = function (parsedDate) {
    const dayArray = [];
    parsedDate.forEach((element) => {
      const dayLabel = getDayLabel(element.getDay());
      dayArray.push(dayLabel);
    });

    return countFrequency(dayArray);
  };

  const countHourFreqeuncy = function (parsedDate) {
    const hourArray = [];
    parsedDate.forEach((element) => {
      hourArray.push(element.getHours());
    });

    return countFrequency(hourArray);
  };

  const countNameFrequnecy = function (script) {
    const nameArray = script.match(KO_NAME_REGEX);
    return countFrequency(nameArray);
  };

  const parseToDateArray = function (script) {
    const dateStrArray = script.match(KO_DATE_REGEX);
    const dateArray = [];
    const KO_YEAR_REGEX = /\d{4}(?=년)/;
    const KO_MONTH_REGEX = /\d{1,2}(?=월)/;
    const KO_DAY_REGEX = /\d{1,2}(?=일)/;
    const KO_TIME_REGEX = /(?<=((오전)|(오후))\s)\d{1,2}:\d{1,2}/;

    dateStrArray.forEach((element) => {
      const year = parseInt(element.match(KO_YEAR_REGEX));
      const month = parseInt(element.match(KO_MONTH_REGEX));
      const day = parseInt(element.match(KO_DAY_REGEX));
      const timeStrArray = element.match(KO_TIME_REGEX)[0].split(":");
      let hour = parseInt(timeStrArray[0]);
      const minute = parseInt(timeStrArray[1]);
      const isAfternoon = new RegExp("(오후)").test(element);

      if (isAfternoon) {
        hour += 12;
      }

      dateArray.push(new Date(year, month - 1, day, hour, minute));
    });

    return dateArray;
  };

  const countFrequency = function (arr) {
    let map = new Map();
    for (let i = 0; i < arr.length; i++) {
      if (map.has(arr[i])) {
        map.set(arr[i], map.get(arr[i]) + 1);
      } else {
        map.set(arr[i], 1);
      }
    }

    const arrForSort = Array.from(map);
    arrForSort.sort(function (first, second) {
      return second[1] - first[1];
    });
    return arrForSort;
  };

  const removePostposition = function (word) {
    postposition.forEach((filterWord) => {
      if (word.endsWith(filterWord)) {
        return word.slice(0, word.length - filterWord.length);
      }
    });
    return word;
  };

  const getDayLabel = function (day) {
    const week = new Array("일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일");
    const dayLabel = week[day];
    return dayLabel;
  };

  //Property
  const md5Hash = generateHash(content);
  const script = content;
  const parsedDates = parseToDateArray(script);
  //Support Korean only for now
  const lang = /(?<=\r?\n)(저장한 날짜)\s:\s\d{4}년\s\d{1,2}월\s\d{1,2}일\s((오전)|(오후))\s\d{1,2}:\d{1,2}(?=\r?\n)/.test(
    script
  )
    ? LangEnum.ko
    : null;
  const nameFrequency = countNameFrequnecy(script);
  const dayFrequency = countDayFrequency(parsedDates);
  const hourFrequency = countHourFreqeuncy(parsedDates);

  const numberOfPhoto = countMatchToRegex(script, KO_PHOTO_REGEX);
  const numberOfVideo = countMatchToRegex(script, KO_VIDEO_REGEX);
  const numberOfEmoji = countMatchToRegex(script, KO_EMOJI_REGEX);
  const numberOfYoutube = countMatchToRegex(script, YOUTUBE_LINK_REGEX);

  const beginDate = parsedDates[0];
  const endDate = parsedDates[parsedDates.length - 1];
  const numberOfLines = parsedDates.length;

  return {
    getMd5Hash: () => {
      return md5Hash;
    },

    getLanguage: () => {
      return lang;
    },

    getScript: () => {
      return script;
    },

    getNameFrequency: () => {
      return nameFrequency;
    },

    getDayFrequency: () => {
      return dayFrequency;
    },

    getHourFrequency: () => {
      return hourFrequency;
    },

    getBeginDate: () => {
      return beginDate;
    },

    getEndDate: () => {
      return endDate;
    },

    getPhotoFrequency: () => {
      return numberOfPhoto;
    },

    getVideoFrequency: () => {
      return numberOfVideo;
    },

    getEmojiFrequency: () => {
      return numberOfEmoji;
    },

    getYoutubeFrequency: () => {
      return numberOfYoutube;
    },

    getTypingRanking: () => {
      return getTypingRanking(script);
    },

    numberOfLines: numberOfLines,
  };
}
