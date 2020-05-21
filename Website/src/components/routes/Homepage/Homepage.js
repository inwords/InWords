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
import Grid from 'src/components/core/Grid';
import GridItem from 'src/components/core/GridItem';
import InWordsLogo from 'src/components/routes-common/InWordsLogo';

import coursesPicture from './courses.png';
import levelsPicture from './levels.png';
import cardGamePicture from './cardGame.png';
import dictionaryPicture from './dictionary.png';

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

const features = [
  {
    title: 'Множество готовых тем',
    description: `Более 14 различных тем, включающих в себя самые используемые и
    необходимые слова. Каждая тема состоит из нескольких уровней,
    упрощающих изучение слов.`,
    picture: coursesPicture
  },
  {
    title: 'Уровни с возрастающей сложностью',
    description: `С каждым новым уровнем увеличивается количество слов на игровом
    поле, а также их сложность, что делает процесс обучения более
    плавным и увлекательным.`,
    picture: levelsPicture
  },
  {
    title: 'Тренировка в виде игры',
    description: `Благодаря простой игре можно не только запоминать слова, но и
    тренировать память, запоминая размещение карточек на игровом
    поле.`,
    picture: cardGamePicture
  },
  {
    title: 'Свой собственный словарь',
    description: `Слова из тем, а также любые другие слова можно добавлять в
    личный словарь и составлять из них свои свои собственные
    тренировки. Кроме того, тренировки по словам из словаря будут
    создаваться автоматически через некоторые промежутки времени,
    способствуя более качественному изучению слов.`,
    picture: dictionaryPicture
  }
];

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
            <InWordsLogo height={128} className="homepage-hero-logo" />
          </a>
          <Typography
            component="h1"
            variant="h4"
            align="center"
            className="homepage-hero-title"
          >
            Система изучения иностранной лексики для начинающих
          </Typography>
          <div className="homepage-hero-buttons-container">
            <Button
              onClick={handleSignInAnonymously}
              color="primary"
              large
              className="homepage-hero-button"
            >
              Начать без регистрации
            </Button>
            <LinkButton
              component={RouterLink}
              to="/sign-in"
              color="primary"
              large
              className="homepage-hero-button"
            >
              Войти в аккаунт
            </LinkButton>
          </div>
        </div>
      </section>
      <section>
        <Container maxWidth="lg" className="homepage-section-container">
          {features.map(({ title, description, picture }, index) =>
            index % 2 === 0 ? (
              <Grid key={index} spacing={3} className="homepage-feature">
                <GridItem xs={12} md={6}>
                  <Typography
                    component="h2"
                    variant="h5"
                    gutterBottom
                    className="homepage-feature-title"
                  >
                    {title}
                  </Typography>
                  <Typography
                    component="h2"
                    className="homepage-feature-description"
                  >
                    {description}
                  </Typography>
                </GridItem>
                <GridItem
                  xs={12}
                  md={6}
                  className="homepage-feature-img-container-r"
                >
                  <img
                    src={picture}
                    alt="courses"
                    className="homepage-app-img"
                  />
                </GridItem>
              </Grid>
            ) : (
              <Grid key={index} spacing={3} className="homepage-feature">
                <GridItem
                  xs={12}
                  md={6}
                  className="homepage-feature-img-container-l"
                >
                  <img
                    src={picture}
                    alt="levels"
                    className="homepage-app-img"
                  />
                </GridItem>
                <GridItem xs={12} md={6}>
                  <Typography
                    component="h2"
                    variant="h5"
                    gutterBottom
                    className="homepage-feature-title"
                  >
                    {title}
                  </Typography>
                  <Typography
                    component="h2"
                    className="homepage-feature-description"
                  >
                    {description}
                  </Typography>
                </GridItem>
              </Grid>
            )
          )}
        </Container>
      </section>
      <Divider />
      <section>
        <Container maxWidth="md" className="homepage-section-container">
          <Typography component="h2" variant="h5" gutterBottom>
            Изучайте слова без интернета
          </Typography>
          <Typography gutterBottom>
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
          <Link href="/policy/privacy.html">Политика конфиденциальности</Link>
        </Container>
      </section>
    </Fragment>
  );
}

export default Homepage;
