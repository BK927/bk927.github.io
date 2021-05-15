import React, { useState } from "react";
import useStyles from "asset/style/style";
import ShowcaseCard from "components/ShowcaseCard";

const Home = () => {
  const classes = useStyles();
  // eslint-disable-next-line
  const [cards, setCards] = useState([
    {
      title: "개발 포트폴리오",
      category: "포트폴리오",
      body: "저에 대한 자기소개입니다. 보유한 기술 스택과, 경력 등에 대해서 알 수 있습니다.",
      action: "더보기",
      to: "/portfolio",
    },
    {
        title: "카카오톡 분석기",
        category: "유틸리티",
        body: "단체 채팅방에서 오고 간 대화를 분석할 수 있는 툴입니다.",
        action: "사용하기",
        to: "/kakao-analyser",
      },
      {
        title: "캐릭터 성격 분석기",
        category: "유틸리티",
        body: "웹소설, 드라마, 영화 등을 만드는데 도움될 수 있는 캐릭터 성격 생성기입니다. 가장 권위 있는 심리검사 빅파이브를 기반으로 다양한 틀을 기반으로 캐릭터 성격을 구상하는데 도움을 줍니다.",
        action: "사용하기",
        to: "/character-maker",
      },
  ]);
  const cardsComponent = cards.map((element, index) => {
    return (
      <ShowcaseCard
        key={"card" + String(index)}
        title={element.title}
        category={element.category}
        body={element.body}
        action={element.action}
        to={element.to}
      ></ShowcaseCard>
    );
  });
  return (
    <div className={classes.cardGrid}>
      {cardsComponent}
    </div>
  );
};

export default Home;
