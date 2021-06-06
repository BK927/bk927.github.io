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

export default function SchemaProfile() {
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
              심리 도식이란?
            </Typography>
            <Divider className={classes.divider} />
            <div>
              <Typography gutterBottom={true} variant="body1">
                심리도식(Schema)이란 개인이 세상을 바라보는 틀입니다. 사람은 심리도식을 통해 '이러이러한 상황에서는
                이렇게 생각하고, 저렇게 느끼며, 어떻게 행동해야 한다'을 결정합니다. 심리도식은 사람에 따라 의식 할 수도
                있지만, 그런 심리도식을 가지고 있다는 것을 깨닫지 못할 수도 있습니다.
              </Typography>
              <Typography gutterBottom={true} variant="body1">
                시나리오를 작성하는 데 있어서 심리도식은 캐릭터에게 입체성을 부여해 줄 수 있습니다. 캐릭터는 과거의
                트라우마으로 인해서 심리도식을 가집니다. 그리고 스토리가 진행됨에 따라 심리도식을 맹목적으로 혹은
                고집스럽게 따르다가 갈등을 겪습니다. 때로는 갈등을 통해 심리도식을 깨닫고 성장을 이룰 수도 있습니다.
                때로는 더 심리도식에 매달리면서 깊은 나락을 떨어질 수도 있습니다. 그것도 아니라면 새로운 심리도식을 얻을
                수도 있습니다.
              </Typography>
            </div>
          </Paper>
        </Fade>
      </Modal>
    </Fragment>
  );
}
