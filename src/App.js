import "asset/style/menu.css";
import "asset/style/font.css";
import { defaults } from "react-chartjs-2";

import React, { useEffect } from "react";
import ReactGA from "react-ga";
import { Route } from "react-router-dom";
import { Home, Portfolio, KakaoAnalyser, CharacterMaker } from "pages";
import Menu from "components/Menu";
import useStyles from "asset/style/style";
import Paper from "@material-ui/core/Paper";
import usePageTracking from "hooks/usePageTracking";

function App() {
  const classes = useStyles();

  defaults.font.size = "16";
  defaults.color = "#fff";
  defaults.plugins.tooltip.displayColors = false;

  useEffect(() => ReactGA.initialize("UA-186818040-4"), []);

  usePageTracking();

  /*eslint-disable */
  return (
    <Paper elevation={3} className={classes.Container}>
      <Menu></Menu>
      <Route exact path="/" component={Home} />
      <Route path="/portfolio" component={() => <Portfolio title="포트폴리오" />} />
      <Route path="/kakao-analyser" component={() => <KakaoAnalyser title="카카오톡 대화 분석기" />} />
      <Route path="/character-maker" component={() => <CharacterMaker title="캐릭터 성격 생성기" />} />
      <footer>
        <p>
          Made by&nbsp;
          <ReactGA.OutboundLink
            className={classes.link}
            eventLabel="bustermachinelab"
            to="https://bustermachinelab.net/"
            target="_blank"
            trackerNames={["footer"]}
          >
            BK927
          </ReactGA.OutboundLink>
        </p>
      </footer>
    </Paper>
  );
}

export default App;
