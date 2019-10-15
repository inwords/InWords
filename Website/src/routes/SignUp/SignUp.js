import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import Container from 'src/components/Container';
import Paper from 'src/components/Paper';
import TextField from 'src/components/TextField';
import Button from 'src/components/Button';
import Typography from 'src/components/Typography';
import Link from 'src/components/Link';

import './sign-up.scss';

function SignUp({ inputs, handleChange, handleSubmit }) {
  return (
    <Container maxWidth="xs">
      <Paper className="sign-up-paper">
        <Typography component="h1" variant="h5">
          Регистрация
        </Typography>
        <form onSubmit={handleSubmit} className="sign-up-form">
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
            className="sign-up-form-field"
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
            className="sign-up-form-field"
          />
          <Button
            type="submit"
            color="primary"
            fullWidth
            className="sign-up-submit"
          >
            Зарегистрироваться
          </Button>
          <div className="sign-up-links">
            <Link component={RouterLink} to="signIn" variant="body2">
              Уже есть аккаунт? Войти
            </Link>
          </div>
        </form>
      </Paper>
    </Container>
  );
}

SignUp.propTypes = {
  inputs: PropTypes.exact({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default SignUp;
