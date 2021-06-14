import Fab from "@material-ui/core/Fab";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import React from "react";
import ReactGA from "react-ga";
import domtoimage from "dom-to-image";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  button: {
    "&&": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.text.primary,
      padding: theme.spacing(1.6),
      fontWeight: "600",
      fontSize: "1.2rem",
    },
  },
}));

export default function ExportToImg() {
  const classes = useStyles();

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

  return (
    <div className={classes.root}>
      <Fab color="primary" variant="extended" onClick={capture}>
        <PhotoCameraIcon className={classes.extendedIcon} />
        이미지로 내보내기
      </Fab>
    </div>
  );
}
