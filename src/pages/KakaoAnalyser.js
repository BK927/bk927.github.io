import React, { Fragment, useState } from "react";
import FileUpload from "components/FileUpload.js";
import KakaoContent from "components/KakaoContent.js";
import createChattingAnalyser from "models/chatting_analyser.js";
import Description from "components/kakao_contents/Description";
import BarChart from "components/kakao_contents/BarChart";
import Ranking from "components/kakao_contents/Ranking";
import InnnerGrid from "components/kakao_contents/InnnerGrid";
import useStyles from "asset/style/style";


// TODO: Add Loading Effect, Refactor inefficient chattingAnalyser methods
function KakaoAnalyser(props) {
  const classes = useStyles();
  const [contents, setContents] = useState([]);
  //const [chattingAnalyser, setChattingAnalyser] = useState(undefined);
  const [uploaded, setUploaded] = useState(true);

  const createDescription = function (text) {
    return <Description text={text}></Description>;
  };

  const createBarChart = function (data) {
    return <BarChart data={data}></BarChart>;
  };

  const createRanking = function (data) {
    return <Ranking data={data} />;
  };

  const createInnnerGrid = function (cells) {
    return <InnnerGrid cells={cells}></InnnerGrid>;
  };

  const uploadEvent = function (e) {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const fileContent = e.target.result;
      setUploaded(false);
      const chattingAnalyser = createChattingAnalyser(fileContent);
      setContents([
        { title: "해쉬 코드", items: [[createDescription, chattingAnalyser.getMd5Hash]] },
        {
          title: "집계 기간",
          items: [
            [
              createDescription,
              () => {
                const beginDate = chattingAnalyser.calcBeginDate();
                const endDate = chattingAnalyser.calcEndDate();

                const convertDate = function (date) {
                  const year = String(date.getFullYear()) + "년";
                  const month = String(date.getMonth() + 1) + "월";
                  const day = String(date.getDate()) + "일";

                  return year + " " + month + " " + day;
                };

                return convertDate(beginDate) + " ~ " + convertDate(endDate);
              },
            ],
          ],
        },
        {
          title: "채팅 수 & 하루 평균 채팅 수",
          items: [
            [
              createInnnerGrid,
              () => {
                const beginDate = chattingAnalyser.calcBeginDate();
                const endDate = chattingAnalyser.calcEndDate();
                const numOfLines = chattingAnalyser.calcNumOfLines();

                const gapTime = endDate.getTime() - beginDate.getTime();
                const gapDay = Math.floor(gapTime / (1000 * 60 * 60 * 24));

                return [
                  { title: "채팅 수", text: String(numOfLines) },
                  { title: "하루 평균 채팅 수", text: String(Math.floor(numOfLines / gapDay)) },
                ];
              },
            ],
          ],
        },
        {
          title: "사진, 동영상, 이모티콘, 유튜브 링크 수",
          items: [
            [
              createInnnerGrid,
              () => {
                return [
                  { title: "사진", text: chattingAnalyser.calcPhotoFrequency() },
                  { title: "동영상", text: chattingAnalyser.calcVideoFrequency() },
                  { title: "이모티콘", text: chattingAnalyser.calcEmojiFrequency() },
                  { title: "유튜브 링크 수", text: chattingAnalyser.calcYoutubeFrequency() },
                ];
              },
            ],
          ],
        },
        {
          title: "채팅방에서 말을 가장 많이 한 사람",
          items: [
            [createBarChart, chattingAnalyser.calcNameFrequency],
            [createRanking, chattingAnalyser.calcNameFrequency],
          ],
        },
        {
          title: "채팅방에서 타이핑한 글자수",
          items: [
            [createBarChart, chattingAnalyser.calcTypingRanking],
            [createRanking, chattingAnalyser.calcTypingRanking],
          ],
        },
        {
          title: "가장 활발한 시간대",
          items: [
            [createBarChart, chattingAnalyser.calcHourFrequency],
            [createRanking, chattingAnalyser.calcHourFrequency],
          ],
        },
        {
          title: "가장 활발한 요일",
          items: [
            [createBarChart, chattingAnalyser.calcDayFrequency],
            [createRanking, chattingAnalyser.calcDayFrequency],
          ],
        },
      ]);
    };
    reader.readAsText(file);
  };

  const components = contents.map((element, index) => {
    return <KakaoContent key={index} className={classes.contentBox} title={element.title} items={element.items}></KakaoContent>;
  });

  return (
    <Fragment>
      {uploaded ? 
      (<FileUpload uploadEvent={uploadEvent}></FileUpload>
        ) : (
      components)}
    </Fragment>
  );
}

export default KakaoAnalyser;
