import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "&&":{
      backgroundColor: theme.palette.background.dp02,
    },
  },
  body:{
    marginTop:12,
  }
}));

function ShowcaseCard({title, category, body, to, action}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography  color="textSecondary">
          {category}
        </Typography>
        <Typography className={classes.body} variant="body2" component="p">
          {body}
        </Typography>
      </CardContent>
      <CardActions>
        <Button component={Link} to={to} size="small">
          {action}
        </Button>
      </CardActions>
    </Card>
  );
}

ShowcaseCard.propTypes = {
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  action: PropTypes.string,
};

ShowcaseCard.defaultProps = {
  action: '이동하기',
};

export default ShowcaseCard;
