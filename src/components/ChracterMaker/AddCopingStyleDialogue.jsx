import Checkbox from "@material-ui/core/Checkbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PropTypes from "prop-types";
import React from "react";
import Typography from "@material-ui/core/Typography";

function AddCopingStyleDialogue({ sendValue, disabled }) {
    const copingStyles = ["굴복(얼어붙기)", "회피(도망치기)", "과잉보상(싸우기)"];
    const [checked, setChecked] = React.useState([copingStyles[0]]);

    const handleToggle = (value) => () => {
        let newChecked = [...checked];

        if (!newChecked.includes(value)) {
            newChecked.push(value);
            setChecked(newChecked);
            sendValue(newChecked);
        } else if (newChecked.includes(value) && newChecked.length > 1) {
            const index = newChecked.indexOf(value);
            newChecked.splice(index, 1);
            setChecked(newChecked);
            sendValue(newChecked);
        }

        console.log(newChecked);
    };

    return (
        <List className={null}>
            <Typography color={disabled ? "textSecondary" : "inherit"} variant="h6">
                대처 방식
            </Typography>
            {copingStyles.map((value, index) => {
                const labelId = `checkbox-list-label-${value}`;

                return (
                    <ListItem disabled={disabled} key={value} role={undefined} dense button onClick={handleToggle(value)}>
                        <ListItemIcon>
                            <Checkbox edge="start" checked={checked.includes(value)} tabIndex={-1} disableRipple inputProps={{ "aria-labelledby": labelId }} />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={value} />
                    </ListItem>
                );
            })}
        </List>
    );
}

export default AddCopingStyleDialogue;

AddCopingStyleDialogue.propTypes = {
    sendValue: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
};

AddCopingStyleDialogue.defaultProps = {
    disabled: false,
};
