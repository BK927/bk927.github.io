import "asset/style/menu.css";
import "asset/style/font.css";

import { CharacterMaker, Home, KakaoAnalyser, Portfolio } from "pages";
import React, { useEffect } from "react";

import Container from "@material-ui/core/Container";
import Menu from "components/Menu";
import ReactGA from "react-ga";
import { Route } from "react-router-dom";
import { defaults } from "react-chartjs-2";
import { makeStyles } from "@material-ui/core/styles";
import usePageTracking from "hooks/usePageTracking";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(6, "auto", 9, "auto"),
        width: "1020px",
        maxWidth: "100vw",
    },
    footerLink: {
        color: theme.palette.secondary.main,
        textDecoration: "none",
        fontWeight: "700",
        "&:hover": {
            color: theme.palette.secondary.light,
        },
        transition: theme.transitions.create(["all"], {
            duration: theme.transitions.duration.complex,
            easing: theme.transitions.easing.easeOut,
        }),
    },
}));

function App() {
    const classes = useStyles();

    defaults.color = "#fff";
    defaults.plugins.tooltip.displayColors = false;

    useEffect(() => ReactGA.initialize("UA-186818040-4"), []);

    usePageTracking();

    /*eslint-disable */
    return (
        <Container className={classes.root}>
            <Menu></Menu>
            <Route exact path="/" component={Home} />
            <Route path="/portfolio" component={() => <Portfolio title="포트폴리오" />} />
            <Route path="/kakao-analyser" component={() => <KakaoAnalyser title="카카오톡 대화 분석기" />} />
            <Route path="/character-maker" component={() => <CharacterMaker title="캐릭터 성격 생성기" />} />
            <footer>
                <p>
                    Made by&nbsp;
                    <ReactGA.OutboundLink className={classes.footerLink} eventLabel="bustermachinelab" to="https://bustermachinelab.net/" target="_blank" trackerNames={["footer"]}>
                        BK927
                    </ReactGA.OutboundLink>
                </p>
            </footer>
        </Container>
    );
}

export default App;
