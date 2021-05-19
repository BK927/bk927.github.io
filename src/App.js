import "asset/style/menu.css";
import "asset/style/font.css";
import { defaults } from "react-chartjs-2";

import React from "react";
import { Route } from "react-router-dom";
import { Home, Portfolio, KakaoAnalyser, CharacterMaker } from "pages";
import Menu from "components/Menu";
import useStyles from "asset/style/style";
import Paper from "@material-ui/core/Paper";

function App() {
  const classes = useStyles();
  defaults.font.size = "16";
  defaults.color = "#fff";

  /*eslint-disable */
  return (
    <Paper elevation={3} className={classes.Container}>
      <Menu></Menu>
      <Route exact path="/" component={Home} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/kakao-analyser" component={KakaoAnalyser} />
      <Route path="/character-maker" component={CharacterMaker} />
      <footer>
        <p>
          Made by&nbsp;
          <a href="https://bustermachinelab.net/" className={classes.link} target="_blank" rel="author">
            BK927
          </a>
        </p>
      </footer>
    </Paper>
  );
}

export default App;
