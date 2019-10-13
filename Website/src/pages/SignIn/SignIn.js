import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from 'src/components/Paper';
import TextField from 'src/components/TextField';
import Button from 'src/components/Button';
import Typography from 'src/components/Typography';
import Link from 'src/components/Link';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(2, 3, 3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  logo: {
    margin: theme.spacing(1, 1, 2),
    width: 140
  },
  avatar: {
    margin: theme.spacing(1)
  },
  form: {
    width: '100%'
  },
  formField: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(2, 0)
  },
  links: {
    marginTop: theme.spacing(1)
  }
}));

function SignIn({ inputs, handleChange, handleSubmit }) {
  const classes = useStyles();

  return (
    <Container component="div" maxWidth="xs">
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5">
          Вход
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          <TextField
            id="email"
            label="Email"
            type="email"
            autoComplete="email"
            name="email"
            value={inputs.email}
            onChange={handleChange}
            required
            fullWidth
            className={classes.formField}
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
            fullWidth
            className={classes.formField}
          />
          <Button
            type="submit"
            color="primary"
            fullWidth
            className={classes.submit}
          >
            Войти
          </Button>
          <Grid container justify="flex-end" className={classes.links}>
            <Grid item>
              <Link component={RouterLink} to="/signUp" variant="body2">
                Нет аккаунта? Зарегистрироваться
              </Link>
            </Grid>
          </Grid>
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
