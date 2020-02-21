import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import FormGroup from 'src/components/FormGroup';
import TextField from 'src/components/TextField';
import Typography from 'src/components/Typography';
import Link from 'src/components/Link';
import EntryFormPaper from 'src/templates/EntryFormPaper';
import EntryLinksContainer from 'src/templates/EntryLinksContainer';
import EntrySubmitButton from 'src/templates/EntrySubmitButton';

function SignIn({ inputs, handleChange, handleSubmit }) {
  return (
    <EntryFormPaper>
      <Typography component="h1" variant="h5" gutterBottom>
        Вход
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <TextField
            id="email"
            placeholder="Email"
            type="email"
            autoComplete="email"
            name="email"
            value={inputs.email}
            onChange={handleChange}
            required
            fullWidth
          />
        </FormGroup>
        <FormGroup>
          <TextField
            id="password"
            placeholder="Пароль"
            type="password"
            autoComplete="current-password"
            name="password"
            value={inputs.password}
            onChange={handleChange}
            required
            fullWidth
          />
        </FormGroup>
        <EntrySubmitButton>Войти</EntrySubmitButton>
        <EntryLinksContainer>
          <Link component={RouterLink} to="/signUp">
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
