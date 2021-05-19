import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import useStyles from "asset/style/style";
import PropTypes from "prop-types";
import FacetChart from "components/ChracterMaker/FacetChart";

function PersonalityDetail({ domain, facets }) {
  const classes = useStyles();

  const domainScore = Math.round(facets.reduce((acc, val) => acc + val.score, 0) / facets.length);
  console.log(facets);

  return (
    <Paper>
      <Typography variant="h4">{domain + " : " + String(domainScore)}</Typography>
      <FacetChart facets={facets} />
    </Paper>
  );
}

PersonalityDetail.propTypes = {
  domain: PropTypes.string.isRequired,
  facets: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PersonalityDetail;
