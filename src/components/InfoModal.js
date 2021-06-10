import React, { Fragment, useState } from "react";

import Backdrop from "@material-ui/core/Backdrop";
import Divider from "@material-ui/core/Divider";
import Fade from "@material-ui/core/Fade";
import IconButton from "@material-ui/core/IconButton";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import ReactGA from "react-ga";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

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
    width: '1020px',
    maxWidth: '100%',
    wordBreak: "keep-all",
  },
  divider: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  content: {
    maxHeight:'50vh',
    overflow: 'auto',
  }
}));

export default function InfoModal({ title, content, icon }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    ReactGA.modalview(title);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <IconButton component="span" onClick={handleOpen}>
        {icon}
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
            <div className={classes.content}>{content}</div>
          </Paper>
        </Fade>
      </Modal>
    </Fragment>
  );
}

InfoModal.proptype = {
  title: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  icon: PropTypes.node,
};

InfoModal.defaultProps = {
  icon:<InfoOutlinedIcon />,
};