import React, { Fragment, useState } from "react";

import BarChart from "components/kakao_contents/BarChart";
import ButtonToAction from "components/ButtonToAction.js";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Description from "components/kakao_contents/Description";
import InnnerGrid from "components/kakao_contents/InnnerGrid";
import KakaoChattingAnalyser from "util/KakaoChattingAnalyser.js";
import KakaoContent from "components/kakao_contents/KakaoContent.js";
import Ranking from "components/kakao_contents/Ranking";
import ReactGA from "react-ga";
import ReactHelmet from "components/ReactHelmet";
import useStyles from "asset/style/style";

// TODO: Add Loading Effect(With useEffect)
function KakaoAnalyser({ title }) {
  const classes = useStyles();
  const [contents, setContents] = useState([]);
  const [uploaded, setUploaded] = useState(true);

  const createDescription = function (text, key) {
    return <Description key={key} text={text}></Description>;
  };

  const createBarChart = function (data, key) {
    return <BarChart key={key} data={data}></BarChart>;
  };

  const createRanking = function (data, key) {
    return <Ranking key={key} data={data} />;
  };

  const createInnnerGrid = function (cells, key) {
    return <InnnerGrid key={key} cells={cells}></InnnerGrid>;
  };

  const uploadEvent = function (e) {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    ReactGA.event({
      category: "카카오톡 분석기",
      action: "Clicked",
      label: "파일 업로드",
      value: file.size,
    });

    const reader = new FileReader();
    reader.onload = (e) => {
      const benchStart = performance.now();
      const fileContent = e.target.result;
      setUploaded(false);
      const chattingAnalyser = KakaoChattingAnalyser(fileContent);
      setContents([
        {
          title: "해쉬 코드",
          items: [{ createNodefunc: createDescription, calcDataFunc: chattingAnalyser.getMd5Hash }],
        },
        {
          title: "집계 기간",
          items: [
            {
              createNodefunc: createDescription,
              calcDataFunc: () => {
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
            },
          ],
        },
        {
          title: "채팅 수 & 하루 평균 채팅 수",
          items: [
            {
              createNodefunc: createInnnerGrid,
              calcDataFunc: () => {
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
            },
          ],
        },
        {
          title: "사진, 동영상, 이모티콘, 유튜브 링크 수",
          items: [
            {
              createNodefunc: createInnnerGrid,
              calcDataFunc: () => {
                return [
                  { title: "사진", text: chattingAnalyser.calcPhotoFrequency() },
                  { title: "동영상", text: chattingAnalyser.calcVideoFrequency() },
                  { title: "이모티콘", text: chattingAnalyser.calcEmojiFrequency() },
                  { title: "유튜브 링크 수", text: chattingAnalyser.calcYoutubeFrequency() },
                ];
              },
            },
          ],
        },
        {
          title: "채팅방에서 말을 가장 많이 한 사람",
          items: [
            { createNodefunc: createBarChart, calcDataFunc: chattingAnalyser.calcNameFrequency },
            { createNodefunc: createRanking, calcDataFunc: chattingAnalyser.calcNameFrequency },
          ],
        },
        {
          title: "채팅방에서 타이핑한 글자수",
          items: [
            { createNodefunc: createBarChart, calcDataFunc: chattingAnalyser.calcTypingRanking },
            { createNodefunc: createRanking, calcDataFunc: chattingAnalyser.calcTypingRanking },
          ],
        },
        {
          title: "가장 활발한 시간대",
          items: [
            { createNodefunc: createBarChart, calcDataFunc: chattingAnalyser.calcHourFrequency },
            { createNodefunc: createRanking, calcDataFunc: chattingAnalyser.calcHourFrequency },
          ],
        },
        {
          title: "가장 활발한 요일",
          items: [
            { createNodefunc: createBarChart, calcDataFunc: chattingAnalyser.calcDayFrequency },
            { createNodefunc: createRanking, calcDataFunc: chattingAnalyser.calcDayFrequency },
          ],
        },
      ]);

      const duration = performance.now() - benchStart;
      ReactGA.timing({
        category: "카카오톡 분석기",
        variable: "calculate",
        value: duration, // in milliseconds
        label: "분석하는데 걸린 시간",
      });
    };
    reader.readAsText(file);
  };

  const components = contents.map((element, index) => {
    return (
      <KakaoContent
        key={index}
        className={classes.contentBox}
        title={element.title}
        items={element.items}
      ></KakaoContent>
    );
  });

  return (
    <Fragment>
        <ReactHelmet
        title="카카오톡 대화 분석기"
        description="단체 채팅방에서 오고 간 대화를 분석할 수 있는 툴입니다. 일일 평균 대화 수, 요일 별 평균 채팅량, 참여자 별 채팅량, 이미지 갯수, 유튜브 갯수 등 다양한 분석 결과를 보여줍니다."
        keywords="카카오톡 대화 분석"
        />
      {uploaded ? (
        <ButtonToAction
          title="카카오톡 대화 내보내기 기능을 사용해서 파일을 업로드 해 주세요"
          buttonText="업로드"
          onChange={uploadEvent}
          startIcon={<CloudUploadIcon />}
          inputType="file"
        />
      ) : (
        components
      )}
    </Fragment>
  );
}

export default KakaoAnalyser;
