import React, { useContext, useRef, useState } from "react";

import AddBoxIcon from "@material-ui/icons/AddBox";
import AddCopingStyleDialogue from "components/ChracterMaker/AddCopingStyleDialogue";
import AddSchemaDialogue from "components/ChracterMaker/AddSchemaDialogue";
import AllInclusiveIcon from "@material-ui/icons/AllInclusive";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { CharacterContext } from "context/CharacterContext";
import ConditionalSchema from "asset/ConditionalSchema";
import CopingStyle from "components/ChracterMaker/CopingStyle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Fragment } from "react";
import InfoModal from "components/InfoModal";
import Paper from "@material-ui/core/Paper";
import SchemaAndDomain from "components/ChracterMaker/SchemaAndDomain";
import SchemaCopingStyle from "asset/SchemaCopingStyle";
import Typography from "@material-ui/core/Typography";
import UnconditinalScehma from "asset/UnconditinalScehma";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
    const gap = theme.spacing(3);
    return {
        root: {
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            margin: theme.spacing(2, "auto"),
            padding: theme.spacing(3),
            backgroundColor: theme.palette.background.dp01,
        },
        title: {
            display: "flex",
            width: "100%",
            alignItems: "center",
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(4),
            justifyContent: "center",
        },
        wrapper: {
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            width: "100%",
            margin: theme.spacing(2.5, "auto"),
            "&>:nth-child(odd)": {
                flex: 1,
                alignSelf: "stretch",
            },
            "&>:nth-child(2)": {
                width: gap,
                height: "100%",
                [theme.breakpoints.down("md")]: {
                    width: "100%",
                    height: gap,
                },
            },
            [theme.breakpoints.down("md")]: {
                flexDirection: "column",
            },
        },
        singleWrapper: {
            boxSizing: "border-box",
            width: `calc(50% - ${gap / 2}px)`,
            margin: theme.spacing(2.5, 0),
            [theme.breakpoints.down("md")]: {
                width: "100%",
            },
        },
        item: {
            padding: theme.spacing(1.3),
            backgroundColor: theme.palette.background.dp02,
            position: "relative",
        },
        iconWrapper: {
            position: "relative",
            margin: theme.spacing(0),
            zIndex: "2",
        },
        plusIconButton: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            [theme.breakpoints.down("md")]: {
                transform: "rotate(90deg) translate(-50%, 50%)",
            },
        },
        addPanel: {
            display: "flex",
            justifyContent: "center",
            padding: theme.spacing(5),
            width: "100%",
        },
        addDialogue: {
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
        },
    };
});

function SchemaProfile() {
    const classes = useStyles();
    const context = useContext(CharacterContext);
    const [openDialogue, setOpenDialogue] = useState(false);
    const [addWarning, setAddWarning] = useState(false);
    const [checkedUnconditional, setCheckedUnconditional] = useState(-1);
    const [checkedConditional, setCheckedConditional] = useState(-1);
    const addUnconditionalCS = useRef(["굴복(얼어붙기)"]);
    const addConditionalCS = useRef(["굴복(얼어붙기)"]);

    const handleClickOpenDialogue = () => {
        setOpenDialogue(true);
    };

    const handleCloseDialogue = () => {
        setAddWarning(false);
        setOpenDialogue(false);
        setCheckedUnconditional(-1);
        setCheckedConditional(-1);
        addUnconditionalCS.current = ["굴복(얼어붙기)"];
        addConditionalCS.current = ["굴복(얼어붙기)"];
    };
    const CreateItem = (data, indexInContext) => {
        const conditionalFlag = data.conditionalSchema ? true : false;

        const uncond = UnconditinalScehma[data.unconditionalSchema.index];
        const uncondCoping = data.unconditionalSchema.copingStyles.map((key, i) => {
            const copingStyle = SchemaCopingStyle[key];
            const examples = copingStyle.examples[uncond.schema];
            return <CopingStyle key={i} count={i + 1} name={key} description={copingStyle.description} behaviors={copingStyle.behaviors} examples={examples} />;
        });

        if (conditionalFlag) {
            const cond = ConditionalSchema[data.conditionalSchema.index];
            const condCoping = data.conditionalSchema.copingStyles.map((key, i) => {
                const copingStyle = SchemaCopingStyle[key];
                const examples = copingStyle.examples[cond.schema];
                return <CopingStyle key={i} count={i + 1} name={key} description={copingStyle.description} behaviors={copingStyle.behaviors} examples={examples} />;
            });

            // 심리도식 개별 항목
            return (
                <Box key={indexInContext} className={classes.wrapper}>
                    <Paper className={classes.item} elevation={2}>
                        <SchemaAndDomain
                            index={indexInContext}
                            schema={uncond.schema}
                            description={uncond.description}
                            behaviors={uncond.behaviors}
                            backgrounds={uncond.backgrounds}
                            domain={uncond.domain}
                        />
                        {uncondCoping}
                    </Paper>
                    <div className={classes.iconWrapper}>
                        <div className={classes.plusIconButton}>
                            <InfoModal title={compModalTitle} content={compModalContent} icon={<AllInclusiveIcon style={{ fontSize: "3rem" }} />} />
                        </div>
                    </div>
                    <Paper className={classes.item} elevation={2}>
                        <SchemaAndDomain index={indexInContext} schema={cond.schema} description={cond.description} behaviors={cond.behaviors} backgrounds={cond.backgrounds} domain={cond.domain} />
                        {condCoping}
                    </Paper>
                </Box>
            );
        }

        return (
            <Box key={indexInContext} className={classes.singleWrapper}>
                <Paper className={classes.item} elevation={2}>
                    <SchemaAndDomain
                        index={indexInContext}
                        schema={uncond.schema}
                        description={uncond.description}
                        behaviors={uncond.behaviors}
                        backgrounds={uncond.backgrounds}
                        domain={uncond.domain}
                    />
                    {uncondCoping}
                </Paper>
            </Box>
        );
    };

    const schemaModalTitle = "심리 도식이란?";
    const schemaModalContent = (
        <Fragment>
            <Typography gutterBottom={true} variant="body1">
                심리도식(Schema)이란 개인이 세상을 바라보는 틀입니다. 사람은 심리도식을 통해 '이러이러한 상황에서는 이렇게 생각하고, 저렇게 느끼며, 어떻게 행동해야 한다'을 결정합니다. 심리도식은
                사람에 따라 의식 할 수도 있지만, 그런 심리도식을 가지고 있다는 것을 깨닫지 못할 수도 있습니다.
            </Typography>
            <Typography gutterBottom={true} variant="body1">
                시나리오를 작성하는 데 있어서 심리도식은 캐릭터에게 입체성을 부여해 줄 수 있습니다. 캐릭터는 과거의 트라우마으로 인해서 심리도식을 가집니다. 그리고 스토리가 진행됨에 따라 심리도식을
                맹목적으로 혹은 고집스럽게 따르다가 갈등을 겪습니다. 때로는 갈등을 통해 심리도식을 깨닫고 성장을 이룰 수도 있습니다. 때로는 더 심리도식에 매달리면서 깊은 나락을 떨어질 수도 있습니다.
                그것도 아니라면 새로운 심리도식을 얻을 수도 있습니다.
            </Typography>
        </Fragment>
    );

    const compModalTitle = "무조건 심리도식과 조건 심리도식";
    const compModalContent = (
        <Fragment>
            <Typography gutterBottom variant="h5">
                무조건적 심리도식
            </Typography>
            <Typography gutterBottom variant="body1">
                무조건적 심리도식은 말 그대로 타인이나 자신에 대한 무조건적 믿음입니다. 무조건적 심리도식은 자신이 무언가를 해서 나아질 수 있다는 희망을 가지지 않습니다. 무조건적 심리도식을 가지고
                있는 사람은 그 심리도식에 의해 사랑받을 만하지 않고, 잘 적응하지 못하고, 무능하고, 위험에 처해있다 고 믿습니다. 아니 믿는다는 사실도 자각하지 못하고 그냥 그들에게 심리도식은 진실이자
                사실입니다. 사슬 아이콘 왼쪽 혹은 위에 표시되고 있는 심리도식이 무조건 심리도식입니다.
            </Typography>
            <p></p>
            <Typography gutterBottom variant="h5">
                조건적 심리도식
            </Typography>
            <Typography gutterBottom variant="body1">
                조건적 심리도식은 무조건적 심리도식으로 부터 생기는 고통을 경감시키기 위해 생겨납니다. 그래서 조건적 심리도식은 자신이 무언가를 하면 나아질 수 있다는 희망을 가지게 합니다. 예를들어{" "}
                <Box component="span" fontWeight="fontWeightBold" fontStyle="italic">
                    결함
                </Box>{" "}
                도식에 대해{" "}
                <Box component="span" fontWeight="fontWeightBold" fontStyle="italic">
                    자기희생
                </Box>{" "}
                도식을 발달시키면{" "}
                <Box component="span" fontWeight="fontWeightBold" fontStyle="italic">
                    "내가 내 욕구를 무시하면서까지 너의 모든 욕구를 충족시켜주면, 너는 내가 결함이 있어도 받아줄거야. 그러면 나는 사랑받을 수 없다고 느끼지 않게 될거야"
                </Box>
                라고 생각하게 됩니다. 그러나 그런 믿음과 달리 조건적 도식으로는 무조건적 도식을 충족시킬 수 없고 마음의 안정도 도식을 직시하기 전까지 영원히 찾을 수 없습니다. 사슬 아이콘 오른쪽 혹은
                아래 표시되고 있는 심리도식이 조건 심리도식입니다.
            </Typography>
        </Fragment>
    );

    return (
        <Paper className={classes.root} elevation={3}>
            <Box className={classes.title}>
                <Typography align="center" display="block" variant="h4">
                    캐릭터의 결함(심리도식)
                </Typography>
                <InfoModal title={schemaModalTitle} content={schemaModalContent} />
            </Box>
            {context.schema.map((element, index) => CreateItem(element, index))}
            <Box className={classes.addPanel}>
                <Button variant="text" startIcon={<AddBoxIcon />} size="large" onClick={handleClickOpenDialogue}>
                    추가하기
                </Button>
            </Box>

            <Dialog open={openDialogue} onClose={handleCloseDialogue}>
                <DialogTitle>심리도식 추가하기</DialogTitle>
                <DialogContent>
                    {addWarning ? <Typography color="error">무조건 도식은 반드시 선택하셔야 합니다.</Typography> : <></>}
                    <Box className={classes.addDialogue}>
                        <Box>
                            <AddCopingStyleDialogue disabled={checkedUnconditional === -1} sendValue={(value) => (addUnconditionalCS.current = value)} />
                            <AddSchemaDialogue variant="Unconditional" sendValue={(value) => setCheckedUnconditional(value)} />
                        </Box>
                        <Box>
                            <AddCopingStyleDialogue disabled={checkedUnconditional === -1 || checkedConditional === -1} sendValue={(value) => (addConditionalCS.current = value)} />
                            <AddSchemaDialogue disabled={checkedUnconditional === -1} variant="Conditional" sendValue={(value) => setCheckedConditional(value)} />
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialogue}>취소</Button>
                    <Button
                        autoFocus
                        onClick={() => {
                            if (checkedUnconditional === -1) {
                                setAddWarning(true);
                            } else {
                                const newSchema =
                                    checkedConditional === -1
                                        ? { unconditionalSchema: { index: checkedUnconditional, copingStyles: addUnconditionalCS.current } }
                                        : {
                                              unconditionalSchema: { index: checkedUnconditional, copingStyles: addUnconditionalCS.current },
                                              conditionalSchema: { index: checkedConditional, copingStyles: addConditionalCS.current },
                                          };
                                const newSchemas = [...context.schema, newSchema];
                                context.setSchema(newSchemas);
                                handleCloseDialogue();
                            }
                        }}
                    >
                        추가
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
}

export default SchemaProfile;
