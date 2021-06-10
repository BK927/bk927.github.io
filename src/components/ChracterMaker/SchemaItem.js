import React, { Fragment } from "react";

import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import Box from "@material-ui/core/Box";
import ConditionalSchema from "asset/ConditionalSchema";
import CopingStyle from "components/ChracterMaker/CopingStyle";
import InfoModal from "components/InfoModal";
import { Paper } from "@material-ui/core";
import PropTypes from "prop-types";
import SchemaAndDomain from "components/ChracterMaker/SchemaAndDomain";
import SchemaCopingStyle from "asset/SchemaCopingStyle";
import Typography from "@material-ui/core/Typography";
import UnconditinalScehma from "asset/UnconditinalScehma";
import getRandomInt from "util/getRandomInt";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    flexDirection: 'row',
    margin: theme.spacing(2.5, 'auto'),
    "&>:nth-child(odd)": {
      flex: 1,
      alignSelf: "stretch",
    },
    "&>:nth-child(2)": {
      width: theme.spacing(3),
      height: '100%',
      [theme.breakpoints.down('md')]: {
        width: '100%',
        height: theme.spacing(3),
      },
    },
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  uncondRoot: {
    width: "50%",
  },
  item: {
    padding: theme.spacing(1.3),
    backgroundColor: theme.palette.background.dp03,
  },
  iconWrapper:{
    position: 'relative',
    margin: theme.spacing(0),
  },
  plusIconButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    [theme.breakpoints.down('md')]: {
      transform: 'rotate(90deg) translate(-50%, 50%)',
    },
  },
}));

function SchemaItem({ schemaObj, conditionalFlag }) {
  const classes = useStyles();

  const uncond = schemaObj ? schemaObj : UnconditinalScehma[getRandomInt(UnconditinalScehma.length)];
  const cond = ConditionalSchema[getRandomInt(ConditionalSchema.length)];

  const getCopingStyle = function (schema, count) {
    let leftCopingStyle = Object.getOwnPropertyNames(SchemaCopingStyle);
    const nodes = [];

    for (let i = 0; i < count; i++) {
      const index = getRandomInt(leftCopingStyle.length);
      const key = leftCopingStyle[index];
      const copingStyle = SchemaCopingStyle[key];
      const examples = copingStyle.examples[schema];
      nodes.push(
        <CopingStyle
          key={i}
          count={i + 1}
          name={key}
          description={copingStyle.description}
          behaviors={copingStyle.behaviors}
          examples={examples}
        />
      );
      leftCopingStyle = leftCopingStyle.filter(function (value, index, arr) {
        return value !== key;
      });
    }

    return nodes;
  };

  const modalTitle = "무조건 심리도식과 조건 심리도식";
  const modalContent = (
    <Fragment>
      <Typography gutterBottom variant="body1">
        심리도식(Schema)이란 개인이 세상을 바라보는 틀입니다. 사람은 심리도식을 통해 '이러이러한 상황에서는 이렇게
        생각하고, 저렇게 느끼며, 어떻게 행동해야 한다'을 결정합니다. 심리도식은 사람에 따라 의식 할 수도 있지만, 그런
        심리도식을 가지고 있다는 것을 깨닫지 못할 수도 있습니다.
      </Typography>
      <Typography gutterBottom variant="body1">
        시나리오를 작성하는 데 있어서 심리도식은 캐릭터에게 입체성을 부여해 줄 수 있습니다. 캐릭터는 과거의 트라우마으로
        인해서 심리도식을 가집니다. 그리고 스토리가 진행됨에 따라 심리도식을 맹목적으로 혹은 고집스럽게 따르다가 갈등을
        겪습니다. 때로는 갈등을 통해 심리도식을 깨닫고 성장을 이룰 수도 있습니다. 때로는 더 심리도식에 매달리면서 깊은
        나락을 떨어질 수도 있습니다. 그것도 아니라면 새로운 심리도식을 얻을 수도 있습니다.
      </Typography>
    </Fragment>
  );


  return (
    <Box className={classes.root}>
      <Paper className={classes.item} elevation={2}>
        <SchemaAndDomain
          schema={uncond.schema}
          description={uncond.description}
          behaviors={uncond.behaviors}
          backgrounds={uncond.backgrounds}
          domain={uncond.domain}
        />
        {getCopingStyle(uncond.schema, getRandomInt(2) + 1)}
      </Paper>

      {conditionalFlag ? (
        <Fragment>
          <div className={classes.iconWrapper}>
           <div  className={classes.plusIconButton} >
           <InfoModal title={modalTitle} content={modalContent} icon={<AllInclusiveIcon style={{ fontSize: '3rem' }}/>}/>
              
            </div>
          </div>
          <Paper className={classes.item} elevation={2}>
            <SchemaAndDomain
              schema={cond.schema}
              description={cond.description}
              behaviors={cond.behaviors}
              backgrounds={cond.backgrounds}
              domain={cond.domain}
            />
            {getCopingStyle(cond.schema, getRandomInt(2) + 1)}
          </Paper>
        </Fragment>
      ) : (
        <Fragment />
      )}
    </Box>
  );
}

SchemaItem.propTypes = {
  schemaObj: PropTypes.object,
  conditionalFlag: PropTypes.bool.isRequired,
};

SchemaItem.defaultProps = {
  schemaObj: null,
};

export default SchemaItem;
