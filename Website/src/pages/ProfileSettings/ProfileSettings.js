import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import EmailEditButton from './EmailEditButton';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(2, 3, 3)
  },
  form: {
    width: '100%'
  },
  list: {
    marginTop: theme.spacing(1),
    backgroundColor: theme.palette.background.paper
  },
  actions: {
    marginTop: theme.spacing(3)
  }
}));

function ProfileSettings({ inputs, handleChange, handleSubmit, email }) {
  const classes = useStyles();

  return (
    <Container component="div" maxWidth="sm">
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5">
          Настройки профиля
        </Typography>
        <List className={classes.list}>
          <ListItem>
            <ListItemText primary="Email" secondary={email} />
            <ListItemSecondaryAction>
              <EmailEditButton />
            </ListItemSecondaryAction>
          </ListItem>
          <Divider component="li" />
        </List>
        <form onSubmit={handleSubmit} className={classes.form}>
          <TextField
            id="nickname"
            label="Никнейм"
            name="nickname"
            value={inputs.nickname}
            onChange={handleChange}
            required
            fullWidth
            variant="filled"
            margin="normal"
          />
          <TextField
            id="avatar-path"
            label="URL-адрес аватара"
            type="url"
            name="avatarPath"
            value={inputs.avatarPath}
            onChange={handleChange}
            fullWidth
            variant="filled"
            margin="normal"
          />
          <Grid
            container
            justify="flex-end"
            spacing={2}
            className={classes.actions}
          >
            <Grid item>
              <Button component={Link} to="/profile" color="primary">
                Отмена
              </Button>
            </Grid>
            <Grid item>
              <Button type="submit" variant="contained" color="primary">
                Сохранить
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

ProfileSettings.propTypes = {
  email: PropTypes.string.isRequired,
  inputs: PropTypes.exact({
    nickname: PropTypes.string.isRequired,
    avatarPath: PropTypes.string.isRequired
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default ProfileSettings;
