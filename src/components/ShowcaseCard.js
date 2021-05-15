import { Link } from "react-router-dom";
import useStyles from "asset/style/style";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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

export default ShowcaseCard;
