import React, { Fragment, useContext } from "react";

import { CharacterContext } from "context/CharacterContext";
import CloseIcon from "@material-ui/icons/Close";
import CollapseContent from "components/ChracterMaker/CollapseContent";
import DescriptionIcon from "@material-ui/icons/Description";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import PropTypes from "prop-types";
import SchemaDomain from "asset/SchemaDomain";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    title: {
        margin: theme.spacing(1.5, "auto"),
    },
    closeBtn: {
        position: "absolute",
        top: theme.spacing(1),
        right: theme.spacing(1),
    },
    list: {
        "& .MuiListItemText-primary": {
            fontWeight: 500,
        },
        "& .MuiListItemText-secondary": {
            color: "#F2F2F2",
            marginTop: theme.spacing(1),
        },
    },
}));

function SchemaAndDomain({ index, schema, description, behaviors, backgrounds, domain, copingStyles }) {
    const classes = useStyles();
    const context = useContext(CharacterContext);

    function createRow(title, content) {
        return (
            <Fragment>
                <ListItem>
                    <ListItemText primary={title} secondary={content} />
                </ListItem>
                <Divider component="li" />
            </Fragment>
        );
    }

    const generateList = (element, index) => <li key={index}>{element}</li>;

    const behaviorsList = behaviors.map(generateList);
    const backgroundList = backgrounds.map(generateList);

    const domainRows = [
        createRow("영역(분류)", domain),
        createRow("핵심 믿음", SchemaDomain[domain].coreBelief),
        createRow("핵심 감정 욕구", SchemaDomain[domain].coreEmotionalNeed),
        createRow("영역 해설", SchemaDomain[domain].description),
    ];

    const schemaRows = [createRow("설명", description), createRow("행동 예시", <ul>{behaviorsList}</ul>), createRow("과거 배경 예시", <ul>{backgroundList}</ul>)];

    return (
        <div className={classes.root}>
            <IconButton
                className={classes.closeBtn}
                onClick={() => {
                    const filtered = context.schema.filter((_, i) => i !== index);
                    context.setSchema(filtered);
                }}
            >
                <CloseIcon />
            </IconButton>
            <Typography align="center" className={classes.title} gutterBottom={true} variant="h5">
                {schema}
            </Typography>

            <CollapseContent title={"도식 설명"} icon={<DescriptionIcon />} content={<List className={classes.list}>{schemaRows}</List>} />
            <CollapseContent title={"도식의 영역(분류)"} icon={<DescriptionIcon />} content={<List className={classes.list}>{domainRows}</List>} />
        </div>
    );
}

SchemaAndDomain.propTypes = {
    index: PropTypes.number.isRequired,
    schema: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    behaviors: PropTypes.arrayOf(PropTypes.string).isRequired,
    backgrounds: PropTypes.arrayOf(PropTypes.string).isRequired,
    domain: PropTypes.string.isRequired,
    copingStyles: PropTypes.arrayOf(PropTypes.string),
};

export default SchemaAndDomain;
