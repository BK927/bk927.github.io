import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import IconButton from "@material-ui/core/IconButton";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: theme.palette.background.dp02,
    padding: theme.spacing(4),
    lineHeight: "1.5",
    width: "40vw",
    wordBreak: "keep-all",
  },
  divider: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
}));

export default function InfoModal({ title, content }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <IconButton component="span" onClick={handleOpen}>
        <InfoOutlinedIcon />
      </IconButton>
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
          <Paper className={classes.card} elevation={6}>
            <Typography gutterBottom={true} variant="h4">
              {title}
            </Typography>
            <Divider className={classes.divider} />
            <div>{content}</div>
          </Paper>
        </Fade>
      </Modal>
    </Fragment>
  );
}

InfoModal.proptype = {
  title: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
};
