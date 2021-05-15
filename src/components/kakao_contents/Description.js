import React from "react";
import PropTypes from "prop-types";

function Description(props) {
  return <h4>{props.text}</h4>;
}

Description.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Description;
