import React, { Fragment } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSnackbar } from 'src/actions/commonActions';
import { grantAccess } from 'src/actions/authActions';
import { signUp } from 'src/actions/authApiActions';
import { saveState } from 'src/localStorage';
import Container from 'src/components/core/Container';
import Typography from 'src/components/core/Typography';
import Link from 'src/components/core/Link';
import Button from 'src/components/core/Button';
import LinkButton from 'src/components/core/LinkButton';
import Divider from 'src/components/core/Divider';
import InWordsLogo from 'src/components/routes-common/InWordsLogo';

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
    <Fragment>
      <section className="homepage-hero">
        <div className="homepage-hero-content">
          <a href="/">
            <InWordsLogo height={128} />
          </a>
          <Typography
            component="h1"
            variant="h4"
            className="homepage-hero-description"
          >
            Система изучения иностранной лексики для начинающих
          </Typography>
          <div className="homepage-hero-buttons-container">
            <Button color="primary" large onClick={handleSignInAnonymously}>
              Начать без регистрации
            </Button>
            <LinkButton component={RouterLink} to="/sign-in" large>
              Войти в аккаунт
            </LinkButton>
          </div>
        </div>
      </section>
      <section>
        <Container maxWidth="md" className="homepage-section-container">
          <Typography component="h2" variant="h5">
            Изучайте слова без интернета
          </Typography>
          <Typography variant="body1">
            Загрузите наше приложение для Android
          </Typography>
          <a href="https://play.google.com/store/apps/details?id=ru.inwords.inwords&hl=ru&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1">
            <img
              alt="Доступно в Google Play"
              src="https://play.google.com/intl/en_us/badges/static/images/badges/ru_badge_web_generic.png"
              className="google-play-img"
            />
          </a>
        </Container>
      </section>
      <Divider />
      <section>
        <Container maxWidth="md" className="homepage-section-container">
          <Link href="/policy/website-privacy.html" variant="body1">
            Политика конфиденциальности
          </Link>
        </Container>
      </section>
    </Fragment>
  );
}

export default Homepage;
