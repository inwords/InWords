import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import EntryFormPaper from 'src/components/EntryFormPaper';
import EntryLinksContainer from 'src/components/EntryLinksContainer';
import EntrySubmitButton from 'src/components/EntrySubmitButton';

function SignUp({ inputs, handleChange, handleSubmit }) {
  return (
    <EntryFormPaper square>
      <Typography component="h1" variant="h5" gutterBottom>
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
        <EntrySubmitButton
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Зарегистрироваться
        </EntrySubmitButton>
        <EntryLinksContainer>
          <Link component={RouterLink} to="/signIn" variant="body2">
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
