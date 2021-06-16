import { Action, Fab } from "react-tiny-fab";
import React, { Fragment, useContext } from "react";

import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import { CharacterContext } from "context/CharacterContext";
import ContentCopyIcon from "@material-ui/icons/ContentCopy";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import ReactGA from "react-ga";
import SaveIcon from "@material-ui/icons/Save";
import domtoimage from "dom-to-image";

const copingStyleMap = { "굴복(얼어붙기)": 1, "회피(도망치기)": 2, "과잉보상(싸우기)": 3 };

export default function ExportingFab({ code }) {
    const [open, setOpen] = React.useState(false);
    const context = useContext(CharacterContext);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const capture = () => {
        const node = document.querySelector(".capture-range");
        domtoimage
            .toPng(node)
            .then(function (dataUrl) {
                ReactGA.event({
                    category: "캐릭터 성격 생성",
                    action: "Clicked",
                    label: "이미지로 내보내기",
                });

                var link = document.createElement("a");
                link.download = "character.png";
                link.href = dataUrl;
                link.click();
            })
            .catch(function (error) {
                console.error("oops, something went wrong!", error);
            });
    };

    // const encode = () => {
    // };

    return (
        <Fragment>
            <Fab icon={<AddIcon />} alwaysShowTitle={true} mainButtonStyles={{ backgroundColor: "#f44336" }}>
                <Action text="이미지로 내보내기" children={<PhotoCameraIcon />} onClick={capture} />
                {/* <Action text="저장용 코드 생성" onClick={handleClickOpen} children={<SaveIcon />} /> */}
            </Fab>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <DialogContentText id="save-code">테스트</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" startIcon={<ContentCopyIcon />} onClick={handleClose} variant="contained" size="large">
                        복사하기
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}
