import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  loadingCircle: {
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(15),
    marginLeft: "auto",
    marginRight: "auto",
    "&&": {
      display: "block",
    },
  },
  contentBox: {
    position: "relative",
    display: "block",
    boxSizing: "content-box",
    borderRadius: "5px",
    overflow: "hidden",
    height: "max-content",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginLeft: "auto",
    marginRight: "auto",
    padding: theme.spacing(2),
    "&&": {
      backgroundColor: theme.palette.background.dp02,
    },
    "& h5": {
      display: "block",
      marginBottom: theme.spacing(3.5),
    },
  },
  innerGrid: {
    display: "flex",
    flexBasis: "0",
    gap: theme.spacing(2),
    alignContent: "space-between",
    "& > div": {
      backgroundColor: theme.palette.background.dp03,
      borderRadius: "5px",
      padding: "8px 15px",
      flex: "1",
    },
    "& > div > h4": {
      display: "block",
      marginBottom: "15px",
    },
  },
  cardTitle: {
    fontSize: theme.typography.pxToRem(14),
  },
  rankingList: {
    display: "flex",
    flexDirection: "column",
    alignContent: "flex-start",
    width: "100%",
    padding: 0,
    listStyleType: "none",
    "& li": {
      backgroundColor: theme.palette.background.dp03,
      padding: theme.spacing(1.5),
      margin: "0.3rem 0",
      overflow: "visible",
      whiteSpace: "nowrap",
      transition: theme.transitions.create(["all"], {
        duration: theme.transitions.duration.complex,
        easing: theme.transitions.easing.easeOut,
      }),
    },
    "& li:hover": {
      backgroundColor: theme.palette.background.dp08,
    },
  },
}));

export default useStyles;
