import { DEFAULT_TITLE } from "settings";
import { Helmet } from "react-helmet";
import Logo from "asset/sidebar_logo.png";
import PropTypes from "prop-types";
import React from "react";

const ReactHelmet = ({ keywords, description, title, favicon }) => {
  const displayedTitle = title?title + ' - ' + DEFAULT_TITLE:DEFAULT_TITLE;
  return (
    <Helmet>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <title>{displayedTitle}</title>
      <meta property="og:title" content={displayedTitle} />
      <meta property="og:image" content={favicon? favicon: Logo} />
      <meta property="og:site_name" content="" />
      <meta property="og:description" content={description} />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={favicon} />
      <meta name="twitter:card" content="summary" />
    </Helmet>
  );
};

ReactHelmet.propTypes = {
  keywords: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  title: PropTypes.string,
};

export default ReactHelmet;
