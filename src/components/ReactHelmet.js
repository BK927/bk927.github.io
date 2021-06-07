import { DEFAULT_TITLE } from "settings";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import React from "react";

const ReactHelmet = ({ keywords, description, title, favicon }) => {
  const displayedTitle = title?title + ' - ' + DEFAULT_TITLE:DEFAULT_TITLE;
  const defaultFavicon = "https://bk927.github.io/og-default_image.png";
  return (
    <Helmet>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <title>{displayedTitle}</title>
      <meta property="og:title" content={displayedTitle} />
      <meta property="og:image" content={favicon? favicon: defaultFavicon} />
      <meta property="og:site_name" content="" />
      <meta property="og:description" content={description} />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={favicon? favicon: defaultFavicon} />
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
