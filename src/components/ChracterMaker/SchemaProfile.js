import React from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import PropTypes from "prop-types";
import SchemaItem from "components/ChracterMaker/SchemaItem";
import UnconditinalScehma from "asset/UnconditinalScehma";
import getRandomInt from "util/getRandomInt";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.dp02,
  },
  title: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(4),
    justifyContent: "center",
  },
  halfContainer: {
    display: "grid",
    columnGap: theme.spacing(8.2),
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

function SchemaProfile({ schemaCount }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let leftSchema = UnconditinalScehma.slice();
  const singleSchemaList = [];
  const combinedSchemaList = [];

  for (let i = 0; i < schemaCount; i++) {
    const index = getRandomInt(leftSchema.length);
    const schema = leftSchema[index];
    const flag = Boolean(getRandomInt(2));
    if (flag) {
      combinedSchemaList.push(<SchemaItem key={i} conditionalFlag={flag} schemaObj={schema} />);
    } else {
      singleSchemaList.push(<SchemaItem key={i} conditionalFlag={flag} schemaObj={schema} />);
    }

    leftSchema = leftSchema.filter(function (value, index, arr) {
      return value !== schema;
    });
  }

  return (
    <Paper className={classes.root} elevation={3}>
      <Box className={classes.title}>
        <Typography align="center" display="block" variant="h4">
          캐릭터의 결함(약점)
        </Typography>
        <IconButton component="span" onClick={handleOpen}>
          <InfoOutlinedIcon />
        </IconButton>
      </Box>
      {combinedSchemaList}
      <Box className={classes.halfContainer}>{singleSchemaList}</Box>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Transition modal</h2>
            <p id="transition-modal-description">react-transition-group animates me.</p>
          </div>
        </Fade>
      </Modal>
    </Paper>
  );
}

SchemaProfile.propTypes = {
  schemaCount: PropTypes.number.isRequired,
};

export default SchemaProfile;
