import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PropTypes from "prop-types";
import FacetChart from "components/ChracterMaker/FacetChart";
import { evalBigFiveScore } from "util/BigFiveStandard.js";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.dp03,
  },
  domainTitle: {
    margin: theme.spacing(1.5),
  },
  accHeading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  accSecondHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  facetPanel: {
    backgroundColor: theme.palette.background.dp04,
  },
  innerPanel: {
    backgroundColor: theme.palette.background.dp04,
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
    padding: theme.spacing(2),
  },
  behaviorChip: {
    margin: theme.spacing(0.5),
  },
  domainDescription: {
    lineHeight: "1.5",
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
  },
}));

// TODO: Add domain description, Add more detail about each personalities, Add personality standard
function PersonalityDetail({ domain, domainDescription, personBehaviors, facets }) {
  const classes = useStyles();

  const domainScore = Math.round(facets.reduce((acc, val) => acc + val.score, 0) / facets.length);
  const korEvalMap = Object.freeze({ low: "낮음", middle: "중간", high: "높음" });

  const domainEval = evalBigFiveScore(domainScore);
  const displayedDomainEval = korEvalMap[domainEval] + "(" + String(domainScore) + ")";

  const facetDescriptions = facets.map((facet, index) => {
    const facetEval = evalBigFiveScore(facet.score);
    const displayedEval = String(facet.score) + "점 - " + korEvalMap[facetEval];
    return (
      <Accordion defaultExpanded={true} key={index}>
        <AccordionSummary
          className={classes.facetPanel}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
        >
          <Typography className={classes.accHeading}>{facet.name}</Typography>
          <Typography className={classes.accSecondHeading}>{displayedEval}</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.facetPanel}>
          <Typography>{facet.description[facetEval]}</Typography>
        </AccordionDetails>
      </Accordion>
    );
  });

  const displayedBehaviors = personBehaviors[domainEval].map((element, index) => {
    return <Chip className={classes.behaviorChip} label={element} key={index} />;
  });

  return (
    <Paper className={classes.root} elevation={3}>
      <Typography align="center" className={classes.domainTitle} display="block" variant="h4">
        {domain + " : " + displayedDomainEval}
      </Typography>
      <FacetChart facets={facets} />
      <Paper className={classes.innerPanel} elevation={2}>
        <Typography align="center" display="block" variant="h5">
          설명
        </Typography>
        {domainDescription.split("\n").map((element, index) => (
          <Typography className={classes.domainDescription} key={index}>
            {element}
          </Typography>
        ))}
      </Paper>
      <Paper className={classes.innerPanel} elevation={2}>
        <Typography align="center" display="block" variant="h5">
          보일 수 있는 행동들
        </Typography>
        {displayedBehaviors}
      </Paper>
      {facetDescriptions}
    </Paper>
  );
}

PersonalityDetail.propTypes = {
  domain: PropTypes.string.isRequired,
  domainDescription: PropTypes.string.isRequired,
  personBehaviors: PropTypes.object.isRequired,
  facets: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PersonalityDetail;
