import React, { Fragment } from "react";

import Paper from "@material-ui/core/Paper";
import ReactHelmet from "components/ReactHelmet";
import ShowcaseCard from "components/ShowcaseCard";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(275px, 1fr))",
        gap: theme.spacing(2),
        padding: 0,
    },
    wrapper: {
        padding: theme.spacing(5, 2),
    },
}));

// TODO: fix key warning
const Home = ({ title }) => {
    const classes = useStyles();

    const cards = [
        {
            title: "개발 포트폴리오",
            category: "포트폴리오",
            body: "저에 대한 자기소개입니다. 제가 보유한 기술 스택과, 경력 등에 대해서 알 수 있습니다.",
            action: "더보기",
            to: "/portfolio",
        },
        {
            title: "카카오톡 분석기",
            category: "유틸리티",
            body: "단체 채팅방에서 오고 간 대화를 분석할 수 있는 툴입니다. 일일 평균 대화 수, 요일 별 평균 채팅량, 참여자 별 채팅량, 이미지 갯수, 유튜브 갯수 등 다양한 분석 결과를 보여줍니다.",
            action: "사용하기",
            to: "/kakao-analyser",
        },
        {
            title: "캐릭터 성격 생성기",
            category: "유틸리티",
            body: "시나리오 라이팅, 드라마, 영화, 웹소설 쓰기에 도움이 되는 캐릭터 성격 생성기입니다. 가장 권위 있는 심리검사 IPIP-NEO(빅파이브)와 심리도식을 기반으로 랜덤한 성격을 생성합니다. 생성된 성격을 기반으로 입체적인 캐릭터를 정말로 쉽게 만들 수 있습니다.",
            action: "사용하기",
            to: "/character-maker",
        },
    ];

    const cardsComponent = cards.map((element, index) => {
        return <ShowcaseCard key={index} title={element.title} category={element.category} body={element.body} action={element.action} to={element.to} />;
    });
    return (
        <Fragment>
            <ReactHelmet description="자바스크립트로 구현된 웹앱들을 모아놓은 사이트입니다. 현재 카카오톡 대화 분석기와 웹소설, 시나리오 캐릭터 성격 생성기를 제공하고 있습니다." keywords="BK927" />
            <Paper className={classes.wrapper} elevation={3}>
                <div className={classes.root}>{cardsComponent}</div>
            </Paper>
        </Fragment>
    );
};

export default Home;
