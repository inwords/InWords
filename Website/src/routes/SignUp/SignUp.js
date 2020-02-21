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

function SignUp({ inputs, handleChange, handleSubmit }) {
  return (
    <EntryFormPaper>
      <Typography as="h1" variant="h5" gutterBottom>
        Регистрация
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
