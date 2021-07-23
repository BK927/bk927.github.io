import Checkbox from "@material-ui/core/Checkbox";
import ConditionalSchema from "asset/ConditionalSchema";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PropTypes from "prop-types";
import React from "react";
import Typography from "@material-ui/core/Typography";
import UnconditinalScehma from "asset/UnconditinalScehma";

// variant mustbe 'Unconditional' or ''Conditional'
function AddSchemaDialogue({ variant, sendValue }) {
    const [checked, setChecked] = React.useState(null);

    const schemas = variant === "Unconditional" ? UnconditinalScehma : ConditionalSchema;

    const handleToggle = (value) => () => {
        if (value === checked) {
            setChecked(null);
            sendValue(-1);
        } else {
            setChecked(value);
            const schemaIndex = schemas.indexOf(value);
            sendValue(schemaIndex);
        }
    };

    return (
        <List className={null}>
            <Typography variant="h6">{variant === "Unconditional" ? "무조건 도식" : "조건 도식"}</Typography>
            {schemas.map((value) => {
                const schemaName = value.schema;
                const labelId = `checkbox-list-label-${schemaName}`;

                return (
                    <ListItem key={value} role={undefined} dense button onClick={handleToggle(value)}>
                        <ListItemIcon>
                            <Checkbox edge="start" checked={checked === value} tabIndex={-1} disableRipple inputProps={{ "aria-labelledby": labelId }} />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={value.schema} secondary={value.description} />
                    </ListItem>
                );
            })}
        </List>
    );
}

export default AddSchemaDialogue;

AddSchemaDialogue.propTypes = {
    variant: PropTypes.string,
    sendValue: PropTypes.func.isRequired,
};

AddSchemaDialogue.defaultProps = {
    variant: "Unconditional",
};
