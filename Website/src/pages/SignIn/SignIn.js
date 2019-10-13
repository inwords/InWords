import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import Container from 'src/components/Container';
import Paper from 'src/components/Paper';
import TextField from 'src/components/TextField';
import Button from 'src/components/Button';
import Typography from 'src/components/Typography';
import Link from 'src/components/Link';

import './sign-in.scss';

function SignIn({ inputs, handleChange, handleSubmit }) {
  return (
    <Container maxWidth="xs">
      <Paper className="sign-in-paper">
        <Typography component="h1" variant="h5">
          Вход
        </Typography>
        <form onSubmit={handleSubmit} className="sign-in-form">
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
            className="sign-in-form-field"
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
            className="sign-in-form-field"
          />
          <Button
            type="submit"
            color="primary"
            fullWidth
            className="sign-in-submit"
          >
            Войти
          </Button>
          <div className="sign-in-links">
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
