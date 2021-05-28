import React, { Fragment, useState } from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Paper from "@material-ui/core/Paper";
import useStyles from "asset/style/style";
import ButtonToAction from "components/ButtonToAction";
import PersonalityDetail from "components/ChracterMaker/PersonalityDetail";
import BigFive from "asset/BigFive";

// TODO: Ugly readability at domains. Fix it.
const CharacterMaker = () => {
  const classes = useStyles();
  const [isGenerated, setIsGenerated] = useState(false);

  const [domains, setDomains] = useState(BigFive["domains"]);

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
        <Paper className={classes.contentBox} elevation={3}>
          {bigFive}
        </Paper>
      ) : (
        <div style={{ display: "none" }} />
      )}
    </Fragment>
  );
};

export default CharacterMaker;
