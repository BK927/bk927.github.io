import { Link } from "react-router-dom";
import useStyles from "asset/style/style";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PropTypes from 'prop-types';


function ShowcaseCard(props) {
  const classes = useStyles();

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          {props.title}
        </Typography>
        <Typography className={classes.cardPost} color="textSecondary">
          {props.category}
        </Typography>
        <Typography variant="body2" component="p">
          {props.body}
        </Typography>
      </CardContent>
      <CardActions>
        <Button component={Link} to={props.to} size="small">
          {props.action}
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
