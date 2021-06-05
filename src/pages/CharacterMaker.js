import React, { Fragment, useState } from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ButtonToAction from "components/ButtonToAction";
import PersonalityDetail from "components/ChracterMaker/PersonalityDetail";
import SchemaProfile from "components/ChracterMaker/SchemaProfile";
import BigFive from "asset/BigFive";
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
          <SchemaProfile schemaCount={2} />
        </Fragment>
      ) : (
        <div style={{ display: "none" }} />
      )}
    </Fragment>
  );
};

export default CharacterMaker;
