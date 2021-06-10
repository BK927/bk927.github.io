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
    width:'100%',
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
  item: {
    padding: theme.spacing(1.3),
    backgroundColor: theme.palette.background.dp03,
  },
  iconWrapper: {
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
      <Typography gutterBottom variant="h5">
        무조건적 심리도식
      </Typography>
      <Typography gutterBottom variant="body1">
        무조건적 심리도식은 말 그대로 타인이나 자신에 대한 무조건적 믿음입니다.  무조건적 심리도식은 자신이 무언가를 해서 나아질 수 있다는 희망을 가지지 않습니다. 무조건적 심리도식을 가지고 있는 사람은 그 심리도식에 의해 사랑받을 만하지 않고, 잘 적응하지 못하고, 무능하고, 위험에 처해있다 고 믿습니다. 아니 믿는다는 사실도 자각하지 못하고 그냥 그들에게 심리도식은 진실이자 사실입니다. 사슬 아이콘 왼쪽 혹은 위에 표시되고 있는 심리도식이 무조건 심리도식입니다.
      </Typography>
      <p></p>
      <Typography gutterBottom variant="h5">
        조건적 심리도식
      </Typography>
      <Typography gutterBottom variant="body1">
        조건적 심리도식은 무조건적 심리도식으로 부터 생기는 고통을 경감시키기 위해 생겨납니다. 그래서 조건적 심리도식은 자신이 무언가를 하면 나아질 수 있다는 희망을 가지게 합니다. 예를들어  <Box component="span" fontWeight='fontWeightBold' fontStyle="italic">결함</Box> 도식에 대해 <Box component="span" fontWeight='fontWeightBold' fontStyle="italic">자기희생</Box> 도식을 발달시키면 <Box component="span" fontWeight='fontWeightBold' fontStyle="italic">"내가 내 욕구를 무시하면서까지 너의 모든 욕구를 충족시켜주면, 너는 내가 결함이 있어도 받아줄거야. 그러면 나는 사랑받을 수 없다고 느끼지 않게 될거야"</Box>라고 생각하게 됩니다. 그러나 그런 믿음과 달리 조건적 도식으로는 무조건적 도식을 충족시킬 수 없고 마음의 안정도 도식을 직시하기 전까지 영원히 찾을 수 없습니다. 사슬 아이콘 오른쪽 혹은 아래 표시되고 있는 심리도식이 조건 심리도식입니다.
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
            <div className={classes.plusIconButton} >
              <InfoModal title={modalTitle} content={modalContent} icon={<AllInclusiveIcon style={{ fontSize: '3rem' }} />} />
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
