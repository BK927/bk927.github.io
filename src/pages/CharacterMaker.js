import React, { Fragment, useRef, useState } from "react";

import AssignmentIcon from "@material-ui/icons/Assignment";
import BigFive from "asset/BigFive";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { Box } from "@material-ui/core";
import ButtonToAction from "components/ChracterMaker/ButtonToAction";
import { CharacterContext } from "context/CharacterContext";
import CharacterFab from "components/ChracterMaker/CharacterFab";
import ConditionalSchema from "asset/ConditionalSchema";
import PersonalityDetail from "components/ChracterMaker/PersonalityDetail";
import ReactGA from "react-ga";
import ReactHelmet from "components/ReactHelmet";
import RecentActorsIcon from "@material-ui/icons/RecentActors";
import SchemaCopingStyle from "asset/SchemaCopingStyle";
import SchemaProfile from "components/ChracterMaker/SchemaProfile";
import SchemaSlider from "components/ChracterMaker/SchemaSlider";
import UnconditinalScehma from "asset/UnconditinalScehma";
import getRandomInt from "util/getRandomInt";
import { makeStyles } from "@material-ui/core/styles";
import randIntPermution from "util/randIntPermution";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    navigation: {
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100vw",
        zIndex: 3,
    },
}));

const CharacterMaker = ({ title }) => {
    const classes = useStyles();

    const [isGenerated, setIsGenerated] = useState(false);
    const [nav, setNav] = useState("빅파이브");
    const [bigfive, setBigfive] = useState([]);
    const [schema, setSchema] = useState([]);

    const charaLevel = useRef(2);

    const onCodeLoad = (characterStat) => {
        setBigfive(characterStat.bigfiveScores);
        setSchema(characterStat.schemaIndices);
        setIsGenerated(true);
    };

    const generateRandomPersonality = () => {
        ReactGA.event({
            category: "캐릭터 성격 생성",
            action: "Clicked",
            label: "캐릭터 생성 버튼",
        });

        setIsGenerated(true);
        generateRandomSchema();
        generateRandomBigfive();
    };

    const generateRandomBigfive = () => {
        const bigfiveScores = [];
        const domainList = [...BigFive];
        domainList.forEach((domain, i) => {
            const facetList = [];
            domain.facets.forEach((facet, j) => {
                facetList.push(getRandomInt(100));
            });
            bigfiveScores.push(facetList);
        });

        setBigfive(bigfiveScores);
    };

    const generateRandomSchema = () => {
        const schemaCount = getRandomInt(charaLevel.current + 1) + (charaLevel.current * 2 - 2);
        const singleSchemaList = [];
        const combinedSchemaList = [];
        const randomIndices = randIntPermution(0, UnconditinalScehma.length);
        const randCopingStyle = () => {
            let leftCopingStyle = Object.getOwnPropertyNames(SchemaCopingStyle);
            const result = [];
            const count = getRandomInt(2) + 1;

            for (let i = 0; i < count; i++) {
                const index = getRandomInt(leftCopingStyle.length);
                const key = leftCopingStyle[index];
                result.push(key);
                leftCopingStyle = leftCopingStyle.filter(function (value, index, arr) {
                    return value !== key;
                });
            }
            return result;
        };

        for (let i = 0; i < schemaCount; i++) {
            const flag = Boolean(getRandomInt(2));
            if (flag) {
                combinedSchemaList.push({
                    conditionalSchema: {
                        index: getRandomInt(ConditionalSchema.length),
                        copingStyles: randCopingStyle(),
                    },
                    unconditionalSchema: {
                        index: randomIndices[i],
                        copingStyles: randCopingStyle(),
                    },
                });
            } else {
                singleSchemaList.push({
                    conditionalSchema: null,
                    unconditionalSchema: {
                        index: randomIndices[i],
                        copingStyles: randCopingStyle(),
                    },
                });
            }
        }

        setSchema(combinedSchemaList.concat(singleSchemaList));
    };

    const bigFiveComponents = bigfive.map((facetScores, index) => {
        const data = [...BigFive][index];
        const facets = data.facets.map((element, j) => {
            element["score"] = facetScores[j];
            return element;
        });
        return <PersonalityDetail key={index} domain={data.domain} domainDescription={data.description} personBehaviors={data.behavior} facets={facets} />;
    });

    const resultScreen = nav === "빅파이브" ? bigFiveComponents : <SchemaProfile />;

    return (
        <CharacterContext.Provider value={(bigfive, schema, setBigfive, setSchema)}>
            <ReactHelmet
                title="캐릭터 성격 생성기"
                description="시나리오 라이팅, 드라마, 영화, 웹소설 쓰기에 도움이 되는 캐릭터 성격 생성기입니다. 가장 권위 있는 심리검사 IPIP-NEO와 심리도식을 기반으로 입체적인 성격을 생성합니다."
                keywords="웹소설 캐릭터 만들기,웹소설 쓰기 어플,웹소설 쓰기,소설 쓰는법,웹소설 쓰는법,시나리오 쓰는법"
            />
            <CharacterFab isCharaRendered={isGenerated} onCodeLoad={onCodeLoad} />
            <ButtonToAction
                title="버튼을 누르면 새로운 캐릭터 프로필을 만들 수 있습니다"
                isGenerated={isGenerated}
                generateNew={generateRandomPersonality}
                generateBigfive={() => {
                    ReactGA.event({
                        category: "캐릭터 성격 생성",
                        action: "Clicked",
                        label: "빅파이브만 재생성",
                    });
                    generateRandomBigfive();
                }}
                generateSchema={() => {
                    ReactGA.event({
                        category: "캐릭터 성격 생성",
                        action: "Clicked",
                        label: "결함만 재생성",
                    });
                    generateRandomSchema();
                }}
            />

            <SchemaSlider
                onChange={(e, value) => {
                    if (charaLevel.current !== value) {
                        ReactGA.event({
                            category: "캐릭터 성격 생성",
                            action: "Clicked",
                            value: value,
                            label: "캐릭터 결함 슬라이드",
                        });
                    }
                    charaLevel.current = value;
                }}
            />
            {isGenerated ? (
                <Fragment>
                    <Box className={classes.root + " capture-range"}>{resultScreen}</Box>
                    <BottomNavigation
                        className={classes.navigation}
                        value={nav}
                        onChange={(event, newValue) => {
                            setNav(newValue);
                        }}
                        showLabels
                    >
                        <BottomNavigationAction value={"빅파이브"} label="성격" icon={<AssignmentIcon />} />
                        <BottomNavigationAction value={"심리 도식"} label="결함" icon={<RecentActorsIcon />} />
                    </BottomNavigation>
                </Fragment>
            ) : (
                <Fragment />
            )}
        </CharacterContext.Provider>
    );
};

export default CharacterMaker;
