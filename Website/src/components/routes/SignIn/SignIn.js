import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import Form from 'src/components/core/Form';
import FormGroup from 'src/components/core/FormGroup';
import TextField from 'src/components/core/TextField';
import Typography from 'src/components/core/Typography';
import Link from 'src/components/core/Link';
import EntryFormPaper from 'src/components/routes/common/EntryFormPaper';
import EntryLinksContainer from 'src/components/routes/common/EntryLinksContainer';
import EntryButton from 'src/components/routes/common/EntryButton';

function SignIn({ inputs, handleChange, handleSubmit }) {
  return (
    <EntryFormPaper>
      <Typography component="h1" variant="h5" gutterBottom>
        Вход
      </Typography>
      <Form onSubmit={handleSubmit}>
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
        <EntryButton type="submit">Войти</EntryButton>
        <EntryLinksContainer>
          <Link component={RouterLink} to="/sign-up">
            Нет аккаунта? Зарегистрироваться
          </Link>
        </EntryLinksContainer>
      </Form>
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
