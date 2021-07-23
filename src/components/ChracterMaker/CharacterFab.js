import "react-tiny-fab/dist/styles.css";

import { Action, Fab } from "react-tiny-fab";
import React, { Fragment, useContext, useRef, useState } from "react";

import AddIcon from "@material-ui/icons/Add";
import Alert from "@material-ui/lab/Alert";
import BigNumber from "bignumber.js";
import Button from "@material-ui/core/Button";
import { CharacterContext } from "context/CharacterContext";
import ContentCopyIcon from "@material-ui/icons/ContentCopy";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import OpenInBrowserIcon from "@material-ui/icons/OpenInBrowser";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import PropTypes from "prop-types";
import ReactGA from "react-ga";
import SaveIcon from "@material-ui/icons/Save";
import Snackbar from "@material-ui/core/Snackbar";
import TextField from "@material-ui/core/TextField";
import copy from "copy-to-clipboard";
import domtoimage from "dom-to-image";
import fillZero from "util/fillZero";

const copingStyleMap = {
    "굴복(얼어붙기)": "1",
    "회피(도망치기)": "2",
    "과잉보상(싸우기)": "3",
    1: "굴복(얼어붙기)",
    2: "회피(도망치기)",
    3: "과잉보상(싸우기)",
};

export default function CharacterFab({ onCodeLoad, isCharaRendered }) {
    const [copyWindowopen, setCopyWindowOpen] = useState(false);
    const [loadWindowOpen, setLoadWindow] = useState(false);
    const context = useContext(CharacterContext);
    const [code, setCode] = useState(null);
    const [snackOpen, setSnackOpen] = useState(false);
    const [snackMessage, setSnackMessage] = useState();
    const inputCode = useRef();

    const handleClickCopyWindowOpen = () => {
        ReactGA.event({
            category: "캐릭터 성격 생성",
            action: "Clicked",
            label: "저장용 코드 생성 Fab",
        });
        encode(context);
        setCopyWindowOpen(true);
    };

    const handleClickLoadWindowOpen = () => {
        setLoadWindow(true);
    };

    const handleClickLoadWindowClose = () => setLoadWindow(false);

    const handleCopyBtnClick = () => {
        ReactGA.event({
            category: "캐릭터 성격 생성",
            action: "Clicked",
            label: "저장용 코드 복사",
        });
        copy(code);
        setSnackMessage(
            <Alert variant="filled" onClose={closeSnack} severity="success">
                복사 되었습니다.
            </Alert>
        );
        setSnackOpen(true);
        setCopyWindowOpen(false);
    };

    const closeSnack = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setSnackOpen(false);
    };

    const capture = () => {
        ReactGA.event({
            category: "캐릭터 성격 생성",
            action: "Clicked",
            label: "이미지로 내보내기 Fab",
        });
        const node = document.querySelector(".capture-range");
        setSnackMessage(
            <Alert variant="filled" severity="info">
                이미지 캡쳐를 진행 중입니다. 잠시만 기다려주세요.
            </Alert>
        );
        setSnackOpen(true);
        domtoimage
            .toPng(node)
            .then(function (dataUrl) {
                var link = document.createElement("a");
                link.download = "character.png";
                link.href = dataUrl;
                link.click();
            })
            .catch(function (error) {
                ReactGA.event({
                    category: "캐릭터 성격 생성",
                    action: "Error",
                    label: "이미지로 내보내기 실패",
                    nonInteraction: true,
                });
                setSnackMessage(
                    <Alert variant="filled" severity="error">
                        이미지를 캡쳐하는 데 실패했습니다. 다른 환경에서 시도해주세요.
                    </Alert>
                );
                setSnackOpen(true);
            });
    };

    const encode = (chracterObj) => {
        const mapCopingStyle = (key) => copingStyleMap[key];

        const bigFiveCode = chracterObj.bigfive
            .map((arr) => {
                const numStr = arr.map((num) => fillZero(3, String(num))).join("");
                return BigNumber(numStr).toString(36);
            })
            .join("&");

        const schemaCode = chracterObj.schema
            .map((element) => {
                const { conditionalSchema, unconditionalSchema } = element;

                const uncondCode = String(unconditionalSchema.index) + "%" + unconditionalSchema.copingStyles.map(mapCopingStyle).join("");
                if (conditionalSchema) {
                    const condCode = String(conditionalSchema.index) + "%" + conditionalSchema.copingStyles.map(mapCopingStyle).join("");
                    return `${uncondCode}@${condCode}`;
                }
                return `${uncondCode}@-1`;
            })
            .join("&");
        const result = `${bigFiveCode}+${schemaCode}`;
        setCode(result);
        return result;
    };

    const decode = (code) => {
        const chunkArray = function (n, array) {
            if (!array.length) {
                return [];
            }
            return [array.slice(0, n)].concat(chunkArray(n, array.slice(n)));
        };

        const [bigFiveCode, schemaCode] = code.split("+");

        const bigfiveScores = bigFiveCode.split("&").map((hexatrigesimal) => {
            const deximal = BigNumber(hexatrigesimal, 36);

            //number of bigfive facets
            const chunks = chunkArray(3, fillZero(3 * 6, String(deximal)));
            console.log(chunks);
            return chunks.map((facetScoreStr) => parseInt(facetScoreStr));
        });

        let schemaIndices = [];
        if (schemaCode.length > 1) {
            schemaIndices = schemaCode.split("&").map((schemaChunk) => {
                const codeArray = schemaChunk.split("@");
                const [uncondCode, condCode] = codeArray.map((encoded) => {
                    if (encoded === "-1") {
                        return null;
                    }
                    const [indexStr, copingStylesCode] = encoded.split("%");

                    return { index: parseInt(indexStr), copingStyles: Array.from(copingStylesCode).map((value) => copingStyleMap[value]) };
                });
                return {
                    unconditionalSchema: uncondCode,
                    conditionalSchema: condCode,
                };
            });
        }

        return { bigfiveScores: bigfiveScores, schemaIndices: schemaIndices };
    };

    const loadCode = () => {
        try {
            ReactGA.event({
                category: "캐릭터 성격 생성",
                action: "Clicked",
                label: "저장용 코드에서 불러오기",
            });
            const characterStat = decode(inputCode.current.value);
            onCodeLoad(characterStat);
            setSnackMessage(
                <Alert variant="filled" onClose={closeSnack} severity="success">
                    불러오기 완료
                </Alert>
            );
            setSnackOpen(true);
            handleClickLoadWindowClose(false);
        } catch (error) {
            ReactGA.event({
                category: "캐릭터 성격 생성",
                action: "Error",
                label: "저장용 코드에서 불러오기 실패",
                nonInteraction: true,
            });
            console.log("decode error: ", error);
            setSnackMessage(
                <Alert variant="filled" severity="error">
                    불러오기에 실패했습니다. 올바르지 못한 형식의 저장 코드입니다.
                </Alert>
            );
            setSnackOpen(true);
        }
    };

    return (
        <Fragment>
            {isCharaRendered ? (
                <Fragment>
                    <Fab icon={<AddIcon />} alwaysShowTitle={true} mainButtonStyles={{ backgroundColor: "#f44336" }}>
                        <Action text="코드로 불러오기" onClick={handleClickLoadWindowOpen} children={<OpenInBrowserIcon />} />
                        <Action text="저장용 코드 생성" onClick={handleClickCopyWindowOpen} children={<SaveIcon />} />
                        <Action text="이미지로 내보내기" children={<PhotoCameraIcon />} onClick={capture} />
                    </Fab>
                    <Dialog maxWidth="xl" open={copyWindowopen} onClose={() => setCopyWindowOpen(false)}>
                        <DialogContent>
                            <DialogContentText id="save-code">{code}</DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button color="secondary" startIcon={<ContentCopyIcon />} onClick={handleCopyBtnClick} variant="contained" size="large">
                                복사하기
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Fragment>
            ) : (
                <Fragment>
                    <Fab icon={<AddIcon />} alwaysShowTitle={true} mainButtonStyles={{ backgroundColor: "#f44336" }}>
                        <Action text="코드로 불러오기" onClick={handleClickLoadWindowOpen} children={<OpenInBrowserIcon />} />
                    </Fab>
                </Fragment>
            )}

            <Dialog open={loadWindowOpen} onClose={handleClickLoadWindowClose}>
                <DialogTitle id="form-dialog-title">불러오기</DialogTitle>
                <DialogContent>
                    <DialogContentText>저장용으로 생성한 코드를 불러옵니다.</DialogContentText>
                    <TextField autoFocus margin="dense" label="저장용 코드" inputRef={inputCode} type="text" fullWidth variant="outlined" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickLoadWindowClose}>취소</Button>
                    <Button onClick={loadCode}>불러오기</Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={snackOpen} autoHideDuration={3000} onClose={closeSnack}>
                {snackMessage}
            </Snackbar>
        </Fragment>
    );
}

CharacterFab.propTypes = {
    onCodeLoad: PropTypes.func.isRequired,
    isCharaRendered: PropTypes.bool.isRequired,
};
