import React, { Fragment, useRef, useState } from "react";

import BigFive from "asset/BigFive";
import { Box } from "@material-ui/core";
import ButtonToAction from "components/ButtonToAction";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ExportToImg from "components/ExportToImg";
import PersonalityDetail from "components/ChracterMaker/PersonalityDetail";
import ReactGA from "react-ga";
import ReactHelmet from "components/ReactHelmet";
import SchemaProfile from "components/ChracterMaker/SchemaProfile";
import SchemaSlider from "components/ChracterMaker/SchemaSlider";
import getRandomInt from "util/getRandomInt";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
}));

// TODO: Add pyscholgical schema
const CharacterMaker = ({ title }) => {
  const classes = useStyles();

  const [isGenerated, setIsGenerated] = useState(false);
  const [domains, setDomains] = useState(BigFive);

  let charaLevel = useRef(2);

  const generateRandomStat = () => {
    return Math.floor(Math.random() * Math.floor(100));
  };

  const allocStatsToDomain = () => {
    const domainList = [...domains];
    domainList.forEach((domain, i) => {
      domain.facets.forEach((facet, j) => {
        domainList[i].facets[j]["score"] = generateRandomStat();
      });
    });
    setDomains(domainList);
  };

  const generatePersonality = () => {
    ReactGA.event({
      category: "캐릭터 성격 생성",
      action: "Clicked",
      label: "캐릭터 생성 버튼",
    });
    setIsGenerated(true);
    allocStatsToDomain();
  };

  const bigFive = domains.map((item, index) => {
    return (
      <PersonalityDetail
        key={index}
        domain={item.domain}
        domainDescription={item.description}
        personBehaviors={item.behavior}
        facets={item.facets}
      />
    );
  });

  return (
    <Fragment>
      <ReactHelmet
        title="캐릭터 성격 생성기"
        description="시나리오 라이팅, 드라마, 영화, 웹소설 쓰기에 도움이 되는 캐릭터 성격 생성기입니다. 가장 권위 있는 심리검사 IPIP-NEO와 심리도식을 기반으로 입체적인 성격을 생성합니다."
        keywords="웹소설 캐릭터 만들기,웹소설 쓰기 어플,웹소설 쓰기,소설 쓰는법,웹소설 쓰는법,시나리오 쓰는법"
      />
      <ButtonToAction
        title="버튼을 누르면 새로운 캐릭터 프로필을 만들 수 있습니다"
        buttonText="생성하기"
        onClick={generatePersonality}
        startIcon={<CheckCircleIcon />}
        inputType="button"
      />

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
        <Box className={classes.root + " capture-range"}>
          <ExportToImg />
          {bigFive}
          <SchemaProfile
            schemaCount={
              getRandomInt(charaLevel.current + 1) +
              (charaLevel.current * 2 - 2)
            }
          />
        </Box>
      ) : (
        <Fragment />
      )}
    </Fragment>
  );
};

export default CharacterMaker;
