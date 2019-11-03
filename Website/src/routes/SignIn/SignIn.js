import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3)
  },
  submit: {
    marginTop: theme.spacing(2)
  },
  linksContainer: {
    marginTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'flex-end'
  }
}));

function SignIn({ inputs, handleChange, handleSubmit }) {
  const classes = useStyles();

  return (
    <Container maxWidth="xs">
      <Paper elevation={1} className={classes.paper}>
        <Typography component="h1" variant="h5" gutterBottom>
          Вход
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            id="email"
            label="Email"
            type="email"
            autoComplete="email"
            name="email"
            value={inputs.email}
            onChange={handleChange}
            required
            margin="normal"
            variant="outlined"
            fullWidth
          />
          <TextField
            id="password"
            label="Пароль"
            type="password"
            autoComplete="current-password"
            name="password"
            value={inputs.password}
            onChange={handleChange}
            required
            margin="normal"
            variant="outlined"
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className={classes.submit}
          >
            Войти
          </Button>
          <div className={classes.linksContainer}>
            <Link component={RouterLink} to="/signUp" variant="body2">
              Нет аккаунта? Зарегистрироваться
            </Link>
          </div>
        </form>
      </Paper>
    </Container>
  );
}

SignIn.propTypes = {
  inputs: PropTypes.exact({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default SignIn;
