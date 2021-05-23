import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  Container: {
    borderRadius: "10px",
    maxWidth: "1400px",
    minWidth: "30vw",
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(6),
    marginLeft: "auto",
    marginRight: "auto",
    padding: theme.spacing(4),
  },
  btaBox: {
    textAlign: "center",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    height: "auto",
    margin: "30px auto 30px auto",
    overflow: "auto",
    "& > .MuiTypography-root": {
      margin: theme.spacing(7),
    },
    "& > .MuiButton-root": {
      display: "flex",
      textAlign: "center",
      alignItems: "center",
      margin: "0 auto",
      borderRadius: "0.25em",
      fontSize: "1.5rem",
      transition: "all 0.3s ease-out",
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
  link: {
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
  uploadButton: {
    "&&": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.text.primary,
      padding: theme.spacing(1.6),
      fontWeight: "600",
      fontSize: "1.2rem",
    },
  },
  cardTitle: {
    fontSize: 14,
  },
  cardPost: {
    marginBottom: 12,
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    "& > .MuiPaper-root": {
      margin: theme.spacing(2),
      minWidth: 275,
      backgroundColor: theme.palette.background.dp02,
    },
  },
  chartContainer: {
    position: "relative",
    margin: "0 auto",
    padding: theme.spacing(1),
    height: theme.spacing(50),
    borderRadius: "5px",
    overflow: "hidden",
    "&&": {
      backgroundColor: theme.palette.background.dp03,
    },
    "& * ": {
      transition: "none",
    },
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
  domainTitle: {
    margin: theme.spacing(3),
  },
}));

export default useStyles;
