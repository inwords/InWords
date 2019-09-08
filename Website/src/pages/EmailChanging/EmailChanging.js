import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(2, 3, 3)
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  submit: {
    marginTop: theme.spacing(3)
  },
  links: {
    textAlign: 'right'
  }
}));

function EmailChanging({ inputs, handleChange, handleSubmit }) {
  const classes = useStyles();

  return (
    <Container component="div" maxWidth="xs">
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5">
          Изменение Email
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          <TextField
            id="email"
            label="Новый email"
            type="email"
            autoComplete="email"
            name="email"
            value={inputs.email}
            onChange={handleChange}
            required
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <Tooltip
            title="На новый email придет письмо с подтверждением"
            placement="top"
          >
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Сохранить адрес
            </Button>
          </Tooltip>
        </form>
      </Paper>
    </Container>
  );
}

EmailChanging.propTypes = {
  inputs: PropTypes.exact({
    email: PropTypes.string.isRequired
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default EmailChanging;
