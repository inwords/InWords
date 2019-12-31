import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Typography from 'src/components/Typography';
import Link from 'src/components/Link';
import EntryFormPaper from 'src/layout/EntryFormPaper';
import EntryLinksContainer from 'src/layout/EntryLinksContainer';
import EntrySubmitButton from 'src/layout/EntrySubmitButton';

function SignUp({ inputs, handleChange, handleSubmit }) {
  return (
    <EntryFormPaper>
      <Typography as="h1" variant="h5">
        Регистрация
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
        <EntrySubmitButton>Зарегистрироваться</EntrySubmitButton>
        <EntryLinksContainer>
          <Link component={RouterLink} to="/signIn">
            Уже есть аккаунт? Войти
          </Link>
        </EntryLinksContainer>
      </form>
    </EntryFormPaper>
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
