import React from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSnackbar } from 'src/actions/commonActions';
import { grantAccess } from 'src/actions/authActions';
import { signUp, signInOAuth2 } from 'src/actions/authApiActions';
import { saveState } from 'src/localStorage';
import useForm from 'src/hooks/useForm';
import Form from 'src/components/core/Form';
import FormGroup from 'src/components/core/FormGroup';
import TextField from 'src/components/core/TextField';
import Typography from 'src/components/core/Typography';
import Link from 'src/components/core/Link';
import Avatar from 'src/components/core/Avatar';
import Icon from 'src/components/core/Icon';
import Button from 'src/components/core/Button';
import EntryFormPaper from 'src/components/routes/common/EntryFormPaper';
import EntryLinksContainer from 'src/components/routes/common/EntryLinksContainer';
import EntryButtonContainer from 'src/components/routes/common/EntryButtonContainer';
import GSignInButton from 'src/components/routes/common/GSignInButton';

const handleSignUpSuccess = (data, dispatch, history) => {
  dispatch(grantAccess(data));
  saveState({
    auth: {
      token: data.token,
      userId: data.userId
    }
  });
  history.push('/profile');
};

function SignUp() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { inputs, handleChange, handleSubmit } = useForm(
    {
      email: '',
      password: ''
    },
    async () => {
      try {
        const data = await dispatch(signUp(inputs));
        handleSignUpSuccess(data, dispatch, history);
        dispatch(
          setSnackbar({
            text: 'На указанный email было отправлено письмо с подтверждением'
          })
        );
      } catch (error) {
        dispatch(setSnackbar({ text: 'Не удалось зарегистрироваться' }));
      }
    }
  );

  const handleSubmitAnonymously = async () => {
    try {
      const data = await dispatch(signUp(inputs, true));
      handleSignUpSuccess(data, dispatch, history);
    } catch (error) {
      dispatch(setSnackbar({ text: 'Не удалось войти гостем' }));
    }
  };

  const handleSignInOAuth2 = React.useCallback(
    async response => {
      const data = await dispatch(signInOAuth2(response.uc.id_token));
      handleSignUpSuccess(data, dispatch, history);
    },
    [dispatch, history]
  );

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
        <EntryButtonContainer>
          <Button type="submit" color="primary" fullWidth large>
            Зарегистрироваться
          </Button>
        </EntryButtonContainer>
        <EntryButtonContainer>
          <Button
            type="button"
            color="default"
            onClick={handleSubmitAnonymously}
            fullWidth
            large
          >
            Войти гостем
          </Button>
        </EntryButtonContainer>
        <EntryButtonContainer>
          <GSignInButton handleSuccess={handleSignInOAuth2} />
        </EntryButtonContainer>
        <EntryLinksContainer>
          <Link component={RouterLink} to="/sign-in">
            Уже есть аккаунт? Войти
          </Link>
        </EntryLinksContainer>
      </Form>
    </EntryFormPaper>
  );
}

export default SignUp;
