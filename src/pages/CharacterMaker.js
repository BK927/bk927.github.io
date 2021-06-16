import { CharacterContext, charaReducer, initialCharacter } from "context/CharacterContext";
import React, { Fragment, useReducer, useRef, useState } from "react";

import BigFive from "asset/BigFive";
import { Box } from "@material-ui/core";
import ButtonToAction from "components/ButtonToAction";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ConditionalSchema from "asset/ConditionalSchema";
import ExportingFab from "components/ChracterMaker/ExportingFab";
import PersonalityDetail from "components/ChracterMaker/PersonalityDetail";
import ReactGA from "react-ga";
import ReactHelmet from "components/ReactHelmet";
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
}));

const CharacterMaker = ({ title }) => {
    const classes = useStyles();

    const [isGenerated, setIsGenerated] = useState(false);
    const [charaState, charaDispatch] = useReducer(charaReducer, initialCharacter);

    const charaLevel = useRef(2);

    const generatePersonality = () => {
        ReactGA.event({
            category: "캐릭터 성격 생성",
            action: "Clicked",
            label: "캐릭터 생성 버튼",
        });

        setIsGenerated(true);
        generateSchema();
        generateBigfive();
    };

    const generateBigfive = () => {
        const bigfiveScores = [];
        const domainList = [...BigFive];
        domainList.forEach((domain, i) => {
            const facetList = [];
            domain.facets.forEach((facet, j) => {
                facetList.push(getRandomInt(100));
            });
            bigfiveScores.push(facetList);
        });

        charaDispatch({
            type: "SET_BIGFIVE_SCORES",
            bigfiveScores: bigfiveScores,
        });
    };

    const generateSchema = () => {
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

        charaDispatch({
            type: "SET_SCHEMA_INDICES",
            schemaIndices: combinedSchemaList.concat(singleSchemaList),
        });
    };

    const bigFiveComponents = charaState.bigfiveScores.map((facetScores, index) => {
        const data = [...BigFive][index];
        const facets = data.facets.map((element, j) => {
            element["score"] = facetScores[j];
            return element;
        });
        return <PersonalityDetail key={index} domain={data.domain} domainDescription={data.description} personBehaviors={data.behavior} facets={facets} />;
    });

    return (
        <Fragment>
            <ReactHelmet
                title="캐릭터 성격 생성기"
                description="시나리오 라이팅, 드라마, 영화, 웹소설 쓰기에 도움이 되는 캐릭터 성격 생성기입니다. 가장 권위 있는 심리검사 IPIP-NEO와 심리도식을 기반으로 입체적인 성격을 생성합니다."
                keywords="웹소설 캐릭터 만들기,웹소설 쓰기 어플,웹소설 쓰기,소설 쓰는법,웹소설 쓰는법,시나리오 쓰는법"
            />
            <ButtonToAction title="버튼을 누르면 새로운 캐릭터 프로필을 만들 수 있습니다" buttonText="생성하기" onClick={generatePersonality} startIcon={<CheckCircleIcon />} inputType="button" />

            <SchemaSlider
                onChange={(e, value) => {
                    if (charaLevel.current !== value) {
                        ReactGA.event({
                            category: "캐릭터 성격 생성",
                            action: "Clicked",
                            value: value,
                            label: "캐릭터 입체도 슬라이드",
                        });
                    }
                    charaLevel.current = value;
                }}
            />
            {isGenerated ? (
                <CharacterContext.Provider value={charaState}>
                    <Box className={classes.root + " capture-range"}>
                        <ExportingFab />
                        {bigFiveComponents}
                        <SchemaProfile />
                    </Box>
                </CharacterContext.Provider>
            ) : (
                <Fragment />
            )}
        </Fragment>
    );
};

export default CharacterMaker;
