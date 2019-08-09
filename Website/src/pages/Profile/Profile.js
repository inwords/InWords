import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 240,
    marginTop: theme.spacing(2),
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  media: {
    height: 0,
    paddingTop: '100%'
  }
}));

function Profile({ avatarPath, nickname, experience, editingAvailable }) {
  const classes = useStyles();

  return (
    <Fade in>
      <Card className={classes.card}>
        {avatarPath && (
          <CardMedia
            image={avatarPath}
            title="Avatar"
            className={classes.media}
          />
        )}
        <CardContent>
          <Typography component="h2" variant="h5" gutterBottom>
            {nickname}
          </Typography>
          <Typography component="p" variant="body2">
            {experience} опыта
          </Typography>
        </CardContent>
        <CardActions>
          {editingAvailable && (
            <Button
              component={Link}
              to="/profileSettings"
              size="small"
              color="primary"
            >
              Редактировать
            </Button>
          )}
        </CardActions>
      </Card>
    </Fade>
  );
}

Profile.propTypes = {
  nickname: PropTypes.string.isRequired,
  avatarPath: PropTypes.string.isRequired,
  experience: PropTypes.number.isRequired,
  editingAvailable: PropTypes.bool.isRequired
};

export default Profile;
