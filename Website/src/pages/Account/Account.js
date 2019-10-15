import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import useDialog from 'hooks/useDialog';
import withReceivedUserInfo from 'components/withReceivedUserInfo';
import EmailEditDialog from './EmailEditDialog';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2, 3, 3)
  },
  list: {
    marginTop: theme.spacing(1)
  }
}));

function Account({ email }) {
  const classes = useStyles();

  const { open, handleOpen, handleClose } = useDialog();

  return (
    <Container component="div" maxWidth="sm">
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5">
          Аккаунт
        </Typography>
        <List className={classes.list}>
          <ListItem button onClick={handleOpen}>
            <ListItemText primary="Email" secondary={email} />
          </ListItem>
          <EmailEditDialog open={open} handleClose={handleClose} />
          <Divider component="li" variant="middle" />
        </List>
      </Paper>
    </Container>
  );
}

Account.propTypes = {
  email: PropTypes.string.isRequired
};

export default withReceivedUserInfo(Account);
