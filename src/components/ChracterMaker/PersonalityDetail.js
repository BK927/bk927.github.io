import React, { Fragment } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import useStyles from "asset/style/style";
import PropTypes from "prop-types";
import FacetChart from "components/ChracterMaker/FacetChart";

// TODO: Add domain description, Add more detail about each personalities, Add personality standard
function PersonalityDetail({ domain, facets }) {
  const classes = useStyles();

  const domainScore = Math.round(facets.reduce((acc, val) => acc + val.score, 0) / facets.length);

  const descriptions = facets.map((facet, index) => {
    return (
      <Accordion key={index}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography>{facet.name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{facet.description}</Typography>
        </AccordionDetails>
      </Accordion>
    );
  });

  return (
    <Fragment>
      <Typography className={classes.domainTitle} variant="h4">
        {domain + " : " + String(domainScore)}
      </Typography>
      <FacetChart facets={facets} />
      {descriptions}
    </Fragment>
  );
}

PersonalityDetail.propTypes = {
  domain: PropTypes.string.isRequired,
  facets: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PersonalityDetail;
