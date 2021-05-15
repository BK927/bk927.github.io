import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import App from "App";

//TODO: Add responsive style
function Root() {
  const theme = createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        light: "#ff7961",
        main: "#f44336",
        dark: "#ba000d",
      },
      secondary: {
        light: "#8561c5",
        main: "#673ab7",
        dark: "#482880",
      },
      background: {
        paper: "#1F1F1F",
        default: "#121212",
        dp01: "#1F1F1F",
        dp02: "#2C2C2C",
        dp03: "#383838",
        dp04: "#454545",
        dp05: "#525252",
        dp06: "#5F5F5F",
        dp07: "#6B6B6B",
        dp08: "#B3B3B3",
      },
      text: {
        highEmphasis: "#F2F2F2",
        midiumEmphasis: "#E6E6E6",
      },
    },
    typography: {
      fontFamily: "Noto Sans KR, Roboto, sans-serif",
    },
    overrides: {
      MuiCssBaseline: {
        "@global": {
          html: {
            WebkitFontSmoothing: "auto",
            display: "grid",
            alignItems: "center",
            width: "100%",
            height: "100%",
            margin: "0",
          },
          body: {
            display: "grid",
            alignItems: "center",
            width: "100%",
            height: "100%",
            margin: "0",
          },
          footer: {
            display: "block",
            textAlign: "center",
            fontSize: "1.4rem",
            fontWeight: "500",
          },
        },
      },
    },
  });

  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter basename="/">
          <App />
        </BrowserRouter>
      </ThemeProvider>
  );
}

export default Root;
