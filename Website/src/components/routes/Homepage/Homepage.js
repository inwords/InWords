import React from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSnackbar } from 'src/actions/commonActions';
import { grantAccess } from 'src/actions/authActions';
import { signUp } from 'src/actions/authApiActions';
import { saveState } from 'src/localStorage';
import Typography from 'src/components/core/Typography';
import Link from 'src/components/core/Link';
import Button from 'src/components/core/Button';
import LinkButton from 'src/components/core/LinkButton';
import InWordsLogo from 'src/components/routes-common/InWordsLogo';
import EntryFormPaper from 'src/components/routes-common/EntryFormPaper';
import EntryInWordsLogo from 'src/components/routes-common/EntryInWordsLogo';
import EntryLinksContainer from 'src/components/routes-common/EntryLinksContainer';
import EntryButtonContainer from 'src/components/routes-common/EntryButtonContainer';
import GSignInButton from 'src/components/routes-common/GSignInButton';

import './Homepage.scss';

const handleSignInSuccess = (data, dispatch, history) => {
  dispatch(grantAccess(data));
  saveState({
    auth: {
      token: data.token,
      userId: data.userId
    }
  });
  history.push('/training/courses');
};

function Homepage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSignInAnonymously = async () => {
    try {
      const data = await dispatch(signUp({}, true));
      handleSignInSuccess(data, dispatch, history);
    } catch (error) {
      dispatch(setSnackbar({ text: 'Не удалось войти гостем' }));
    }
  };

  return (
    <div className="homepage">
      <section className="homepage-hero">
        <div className="homepage-hero-content">
          <a href="/">
            <InWordsLogo height={128} />
          </a>
          <Typography
            component="h1"
            variant="h4"
            className="homepage-description"
          >
            Система изучения иностранной лексики для начинающих
          </Typography>
          <div className="homepage-buttons-container">
            <Button color="primary" large onClick={handleSignInAnonymously}>
              Начать без регистрации
            </Button>
            <LinkButton component={RouterLink} to="/sign-in" large>
              Войти в аккаунт
            </LinkButton>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Homepage;
