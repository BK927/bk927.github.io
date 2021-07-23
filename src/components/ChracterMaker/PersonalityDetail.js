import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Box from "@material-ui/core/Box";
import ChipList from "components/ChracterMaker/ChipList";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FacetChart from "components/ChracterMaker/FacetChart";
import IconButton from "@material-ui/core/IconButton";
import InfoModal from "components/InfoModal";
import { CharacterContext } from "context/CharacterContext";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import ReplayIcon from "@material-ui/icons/Replay";
import Typography from "@material-ui/core/Typography";
import { evalBigFiveScore } from "util/BigFiveStandard.js";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        padding: theme.spacing(3),
        backgroundColor: theme.palette.background.dp01,
    },
    domainTitle: {
        marginBottom: theme.spacing(1.5),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
        backgroundColor: theme.palette.background.dp02,
    },
    innerPanel: {
        backgroundColor: theme.palette.background.dp02,
        marginTop: theme.spacing(1.5),
        marginBottom: theme.spacing(1.5),
        padding: theme.spacing(2),
    },
    domainDescription: {
        lineHeight: "1.5",
        marginTop: theme.spacing(1.5),
        marginBottom: theme.spacing(1.5),
        wordBreak: "keep-all",
    },
}));

function PersonalityDetail({ domain, domainDescription, personBehaviors, facets }) {
    const classes = useStyles();
    const context = useContext(CharacterContext);

    const domainScore = Math.round(facets.reduce((acc, val) => acc + val.score, 0) / facets.length);
    const korEvalMap = Object.freeze({ low: "낮음", middle: "중간", high: "높음" });

    const domainEval = evalBigFiveScore(domainScore);
    const displayedDomainEval = korEvalMap[domainEval] + "(" + String(domainScore) + ")";

    const facetDescriptions = facets.map((facet, index) => {
        const facetEval = evalBigFiveScore(facet.score);
        const displayedEval = String(facet.score) + "점 - " + korEvalMap[facetEval];
        return (
            <Accordion defaultExpanded={true} key={index}>
                <AccordionSummary className={classes.facetPanel} expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
                    <Typography className={classes.accHeading}>{facet.name}</Typography>
                    <Typography className={classes.accSecondHeading}>{displayedEval}</Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.facetPanel}>
                    <Typography>{facet.description[facetEval]}</Typography>
                </AccordionDetails>
            </Accordion>
        );
    });

    return (
        <Paper className={classes.root} elevation={3}>
            <Box className={classes.domainTitle}>
                <Typography align="center" display="block" variant="h5">
                    {domain + " : " + displayedDomainEval}
                </Typography>
                <InfoModal
                    title={domain + "이란?"}
                    content={domainDescription.split("\n").map((element, index) => (
                        <Typography className={classes.domainDescription} key={index}>
                            {element}
                        </Typography>
                    ))}
                />
                <IconButton component="span" onClick={(e) => {}}>
                    <ReplayIcon />
                </IconButton>
            </Box>
            <FacetChart facets={facets} />
            <ChipList title="보일 수 있는 행동들" items={personBehaviors[domainEval]} />
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
