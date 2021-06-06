import React, { Fragment, useState } from "react";

import BigFive from "asset/BigFive";
import ButtonToAction from "components/ButtonToAction";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import PersonalityDetail from "components/ChracterMaker/PersonalityDetail";
import ReactGA from "react-ga";
import ReactHelmet from "components/ReactHelmet";
import SchemaProfile from "components/ChracterMaker/SchemaProfile";
import getRandomInt from "util/getRandomInt";
import useDocumentTitle from "hooks/useDocumentTitle";

// TODO: Add pyscholgical schema
const CharacterMaker = ({ title }) => {
  const [isGenerated, setIsGenerated] = useState(false);
  const [domains, setDomains] = useState(BigFive);
  useDocumentTitle(title);

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
      {isGenerated ? (
        <Fragment>
          {bigFive}
          <SchemaProfile schemaCount={getRandomInt(6) + 1} />
        </Fragment>
      ) : (
        <Fragment />
      )}
    </Fragment>
  );
};

export default CharacterMaker;
