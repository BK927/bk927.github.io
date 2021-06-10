import Box from "@material-ui/core/Box";
import { Fragment } from "react";
import InfoModal from "components/InfoModal";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import React from "react";
import SchemaItem from "components/ChracterMaker/SchemaItem";
import Typography from "@material-ui/core/Typography";
import UnconditinalScehma from "asset/UnconditinalScehma";
import getRandomInt from "util/getRandomInt";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2, 'auto'),
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
  uncondSchemas: {
    display: "grid",
    columnGap: theme.spacing(2.6),
    gridTemplateColumns: "repeat(2, 1fr)",
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: "repeat(1, 1fr)",
    },
  },
}));

function SchemaProfile({ schemaCount }) {
  const classes = useStyles();

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

  const modalTitle = "심리 도식이란?";
  const modalContent = (
    <Fragment>
      <Typography gutterBottom={true} variant="body1">
        심리도식(Schema)이란 개인이 세상을 바라보는 틀입니다. 사람은 심리도식을 통해 '이러이러한 상황에서는 이렇게
        생각하고, 저렇게 느끼며, 어떻게 행동해야 한다'을 결정합니다. 심리도식은 사람에 따라 의식 할 수도 있지만, 그런
        심리도식을 가지고 있다는 것을 깨닫지 못할 수도 있습니다.
      </Typography>
      <Typography gutterBottom={true} variant="body1">
        시나리오를 작성하는 데 있어서 심리도식은 캐릭터에게 입체성을 부여해 줄 수 있습니다. 캐릭터는 과거의 트라우마으로
        인해서 심리도식을 가집니다. 그리고 스토리가 진행됨에 따라 심리도식을 맹목적으로 혹은 고집스럽게 따르다가 갈등을
        겪습니다. 때로는 갈등을 통해 심리도식을 깨닫고 성장을 이룰 수도 있습니다. 때로는 더 심리도식에 매달리면서 깊은
        나락을 떨어질 수도 있습니다. 그것도 아니라면 새로운 심리도식을 얻을 수도 있습니다.
      </Typography>
    </Fragment>
  );

  return (
    <Paper className={classes.root} elevation={3}>
      <Box className={classes.title}>
        <Typography align="center" display="block" variant="h4">
          캐릭터의 결함(심리도식)
        </Typography>
        <InfoModal title={modalTitle} content={modalContent} />
      </Box>
      {combinedSchemaList}
      <Box className={classes.uncondSchemas}>{singleSchemaList}</Box>
    </Paper>
  );
}

SchemaProfile.propTypes = {
  schemaCount: PropTypes.number.isRequired,
};

export default SchemaProfile;
