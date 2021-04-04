import { generateHash } from "/js/md5.min.js";
import { LangEnum, createScriptObj } from "/js/script-obj.js";
import * as Chart from "/js/draw-chart.js";
import { wordCloud } from "/js/text-cloud.js";

function readSingleFile(e) {
  const file = e.target.files[0];
  if (!file) {
    return;
  }

  const initFile = function (e) {
    const scriptData = createScriptObj(e.target.result);
    const fileContent = document.querySelector("#file-content");
    hideHeader();
    setArticlesVisibility(true);
    displayHash(scriptData.getMd5Hash());
    displayPeriod(scriptData.getBeginDate(), scriptData.getEndDate());
    displayChattingStatistics(scriptData.getBeginDate(), scriptData.getEndDate(), scriptData.numberOfLines)
    displayMiscellaneous(
      scriptData.getPhotoFrequency(),
      scriptData.getVideoFrequency(),
      scriptData.getEmojiFrequency(),
      scriptData.getYoutubeFrequency()
    );
    displayNameArticle(scriptData.getNameFrequency());
    displayTypingRanking(scriptData.getTypingRanking());
    displayDayArticle(scriptData.getDayFrequency());
    displayHourArticle(scriptData.getHourFrequency());
  };

  const hideHeader = function () {
    const header = document.querySelector("header");
    header.style.height = "0vh";
    header.style.visibility = "hidden";
    header.style.margin = "0";
  };

  const clearArticles = function () {
    const hash = document.querySelector("#hash-code");
    const period = document.querySelector("#period");
    const olist = document.querySelectorAll("article > ol");
    hash.textContent = "";
    period.textContent = "";
    olist.forEach((element) => {
      element.innerHTML = "";
    });
  };

  const setArticlesVisibility = function (flag) {
    const articles = document.querySelectorAll(".container > article");
    for (let article of articles) {
      if (flag) {
        article.classList.toggle("active");
      }
    }
  };

  const displayHash = function (hash) {
    const node = document.querySelector("#hash-code");
    node.textContent = hash;
  };

  const displayChattingStatistics = function(beginDate, endDate, numberOfLine){
    const gapTime = endDate.getTime() - beginDate.getTime();
    const gapDay = Math.floor(gapTime / (1000 * 60 * 60 * 24));
    const parentNode = document.querySelector('#chatting-statistics');

    {
      const divider = document.createElement("div");
      const title = document.createElement("h4");
      const content = document.createElement("h5");
      title.textContent = '전체 채팅 수';
      content.textContent = String(numberOfLine);
      divider.append(title);
      divider.append(content);
      parentNode.append(divider);
    }

    {
      const divider = document.createElement("div");
      const title = document.createElement("h4");
      const content = document.createElement("h5");
      title.textContent = '하루 평균 채팅 수';
      content.textContent = String(Math.floor(numberOfLine/gapDay));
      divider.append(title);
      divider.append(content);
      parentNode.append(divider);
    }
    
  };

  const displayMiscellaneous = function (numberOfPhoto, numberOfVideo, numberOfEmoji, numberOfYoutube) {
    const parentNode = document.querySelector("#number-of-miscellaneous");
    const arr = [
      ["사진 수", numberOfPhoto],
      ["비디오 수", numberOfVideo],
      ["이모티콘 수", numberOfEmoji],
      ["유튜브 링크 수", numberOfYoutube]
    ];

    arr.forEach((element) => {
      const divider = document.createElement("div");
      const title = document.createElement("h4");
      const content = document.createElement("h5");
      title.textContent = element[0];
      content.textContent = element[1];
      divider.append(title);
      divider.append(content);
      parentNode.append(divider);
    });
  };

  const displayPeriod = function (beginDate, endDate) {
    const node = document.querySelector("#period");
    const convertDate = function (date) {
      const year = String(date.getFullYear()) + "년";
      const month = String(date.getMonth() + 1) + "월";
      const day = String(date.getDate()) + "일";

      return year + " " + month + " " + day;
    };

    node.textContent = convertDate(beginDate) + " ~ " + convertDate(endDate);
  };

  const displayTypingRanking = function (typingRanking) {
    const chartNode = document.querySelector("#typing-chart");
    const textNode = document.querySelector("#typing-ranking");
    const top5 = typingRanking.slice(0, 5);
    const chart = drawChart(chartNode, top5);
    showRankText(textNode, typingRanking);
  };

  const displayNameArticle = function (nameFrequency) {
    const chartNode = document.querySelector("#name-chart");
    const textNode = document.querySelector("#name-ranking");
    const top5 = nameFrequency.slice(0, 5);
    const chart = drawChart(chartNode, top5);
    showRankText(textNode, nameFrequency);
  };

  const displayDayArticle = function (dayFrequency) {
    const chartNode = document.querySelector("#day-chart");
    const textNode = document.querySelector("#day-ranking");
    const chart = drawChart(chartNode, dayFrequency);
    showRankText(textNode, dayFrequency);
  };

  const displayHourArticle = function (hourFrequency) {
    const chartNode = document.querySelector("#time-chart");
    const textNode = document.querySelector("#time-ranking");
    const strAdded = [...hourFrequency];
    for (let i = 0; i < strAdded.length; i++) {
      strAdded[i][0] += "시";
    }
    const top7 = strAdded.slice(0, 7);
    const chart = drawChart(chartNode, top7);
    showRankText(textNode, strAdded);
  };

  const drawChart = function (domNode, frquencyList) {
    const labels = [];
    const values = [];
    frquencyList.forEach((element) => {
      labels.push(element[0]);
      values.push(element[1]);
    });
    return Chart.createBarChart(domNode, "횟수", labels, values);
  };

  const showRankText = function (domNode, list, cutline = -1) {
    let listSize = 0;
    const largestNum = list[0][1];
    list.forEach((element) => {
      listSize += element[1];
    });

    let topItems = list;
    if (cutline > 0) {
      topItems = list.slice(0, cutline);
    }

    topItems.forEach((element) => {
      const item = document.createElement("li");
      const percent = Math.round((element[1] / listSize) * 10000) / 100;
      item.textContent = String(element[0]) + " (" + String(percent) + "%)";
      domNode.append(item);

      const width = String((element[1] * 100) / largestNum) + "%";
      item.style.width = width;
    });
  };

  const reader = new FileReader();
  reader.onload = initFile;
  reader.readAsText(file);
}

(function () {
  document.getElementById("file-input").addEventListener("change", readSingleFile, false);
})();
