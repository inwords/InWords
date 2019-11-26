import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import EntryFormPaper from 'src/components/EntryFormPaper';
import EntryLinksContainer from 'src/components/EntryLinksContainer';
import EntrySubmitButton from 'src/components/EntrySubmitButton';

function SignIn({ inputs, handleChange, handleSubmit }) {
  return (
    <EntryFormPaper square>
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
        <EntrySubmitButton
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Войти
        </EntrySubmitButton>
        <EntryLinksContainer>
          <Link component={RouterLink} to="/signUp" variant="body2">
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
