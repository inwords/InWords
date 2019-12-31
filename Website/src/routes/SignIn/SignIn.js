import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Typography from 'src/components/Typography';
import Link from 'src/components/Link';
import EntryFormPaper from 'src/layout/EntryFormPaper';
import EntryLinksContainer from 'src/layout/EntryLinksContainer';
import EntrySubmitButton from 'src/layout/EntrySubmitButton';

function SignIn({ inputs, handleChange, handleSubmit }) {
  return (
    <EntryFormPaper>
      <Typography component="h1" variant="h5">
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
        <EntrySubmitButton>Войти</EntrySubmitButton>
        <EntryLinksContainer>
          <Link as={RouterLink} to="/signUp">
            Нет аккаунта? Зарегистрироваться
          </Link>
        </EntryLinksContainer>
      </form>
    </EntryFormPaper>
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
