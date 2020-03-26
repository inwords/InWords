import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import Form from 'src/components/core/Form';
import FormGroup from 'src/components/core/FormGroup';
import TextField from 'src/components/core/TextField';
import Typography from 'src/components/core/Typography';
import Link from 'src/components/core/Link';
import Avatar from 'src/components/core/Avatar';
import Icon from 'src/components/core/Icon';
import EntryFormPaper from 'src/components/routes/common/EntryFormPaper';
import EntryLinksContainer from 'src/components/routes/common/EntryLinksContainer';
import EntryButton from 'src/components/routes/common/EntryButton';

function SignUp({
  inputs,
  handleChange,
  handleSubmit,
  handleSubmitAnonymously
}) {
  return (
    <EntryFormPaper>
      <Avatar>
        <Icon>lock</Icon>
      </Avatar>
      <Typography component="h1" variant="h5" gutterBottom>
        Регистрация
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
        <EntryButton type="submit">Зарегистрироваться</EntryButton>
        <EntryButton
          type="button"
          color="default"
          onClick={handleSubmitAnonymously}
        >
          Войти гостем
        </EntryButton>
        <EntryLinksContainer>
          <Link component={RouterLink} to="/sign-in">
            Уже есть аккаунт? Войти
          </Link>
        </EntryLinksContainer>
      </Form>
    </EntryFormPaper>
  );
}

SignUp.propTypes = {
  inputs: PropTypes.exact({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleSubmitAnonymously: PropTypes.func.isRequired
};

export default SignUp;
