import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { useSelector } from 'react-redux';
import Container from 'src/components/Container';
import PageProgress from 'src/components/PageProgress';
import ScrollToTop from 'src/components/ScrollToTop';
import SmartSnackbar from 'src/layout/SmartSnackbar';
import PageContainer from 'src/layout/PageContainer';
import ProfileMenuButton from 'src/layout/ProfileMenuButton';
import ErrorBoundary from 'src/layout/ErrorBoundary';

const SignIn = lazy(() => import('./routes/SignIn'));
const SignUp = lazy(() => import('./routes/SignUp'));
const Profile = lazy(() => import('./routes/Profile'));
const DictionaryMain = lazy(() => import('./routes/DictionaryMain'));
const Dictionary = lazy(() => import('./routes/Dictionary'));
const TrainingCategories = lazy(() => import('./routes/TrainingCategories'));
const TrainingTypes = lazy(() => import('./routes/TrainingTypes'));
const MainTrainingTypes = lazy(() => import('./routes/MainTrainingTypes'));
const TrainingLevels = lazy(() => import('./routes/TrainingLevels'));
const TrainingHistory = lazy(() => import('./routes/TrainingHistory'));
const Game = lazy(() => import('./routes/Game'));
const SelectTranslateTraining = lazy(() =>
  import('./routes/SelectTranslateTraining')
);

const history = createBrowserHistory();

const routes = [
  {
    to: '/dictionary',
    text: 'Словарь',
    nestedRoutes: [
      {
        to: '/dictionary/main',
        text: 'Главная'
      },
      {
        to: '/dictionary/my',
        text: 'Мой словарь'
      }
    ]
  },
  {
    to: '/training',
    text: 'Обучение',
    nestedRoutes: [
      {
        to: '/training/main',
        text: 'Тренировки'
      },
      {
        to: '/training/history',
        text: 'История'
      },
      {
        to: '/training/themes',
        text: 'Темы'
      }
    ]
  }
];

function App() {
  const userId = useSelector(store => store.access.userId);

  return (
    <Router history={history}>
      <ScrollToTop />
      <SmartSnackbar />
      <Suspense fallback={<PageProgress />}>
        <PageContainer
          routes={userId ? routes : undefined}
          rightNodes={userId ? [<ProfileMenuButton key={0} />] : undefined}
        >
          <ErrorBoundary>
            <Switch>
              <Route exact path="/">
                {!userId ? (
                  <Redirect to="/signIn" />
                ) : (
                  <Redirect to="/dictionary" />
                )}
              </Route>
              <Route path="/signIn">
                <Container maxWidth="xs">
                  <SignIn />
                </Container>
              </Route>
              <Route path="/signUp">
                <Container maxWidth="xs">
                  <SignUp />
                </Container>
              </Route>
              <Route path="/profile">
                <Container maxWidth="md">
                  <Profile />
                </Container>
              </Route>
              <Route exact path="/dictionary">
                <Redirect to="/dictionary/main" />
              </Route>
              <Route path="/dictionary/main">
                <Container maxWidth="md">
                  <DictionaryMain />
                </Container>
              </Route>
              <Route path="/dictionary/my">
                <Container maxWidth="md">
                  <Dictionary />
                </Container>
              </Route>
              <Route exact path="/training">
                <Redirect to="/training/main" />
              </Route>
              <Route exact path="/training/main">
                <Container maxWidth="lg">
                  <MainTrainingTypes />
                </Container>
              </Route>
              <Route
                path="/training/main/:trainingId/:levelId"
                render={({ match, ...rest }) => {
                  switch (match.params.trainingId) {
                    case '0':
                      return (
                        <Container maxWidth="lg">
                          <Game match={match} {...rest} />
                        </Container>
                      );
                    case '1':
                      return (
                        <Container maxWidth="lg">
                          <SelectTranslateTraining match={match} {...rest} />
                        </Container>
                      );
                    default:
                      return null;
                  }
                }}
              ></Route>
              <Route exact path="/training/themes">
                <Container maxWidth="lg">
                  <TrainingCategories />
                </Container>
              </Route>
              <Route exact path="/training/history">
                <Container maxWidth="lg">
                  <TrainingHistory />
                </Container>
              </Route>
              <Route exact path="/training/themes/:categoryId">
                <Container maxWidth="lg">
                  <TrainingTypes />
                </Container>
              </Route>
              <Route exact path="/training/themes/:categoryId/:trainingId">
                <Container maxWidth="lg">
                  <TrainingLevels />
                </Container>
              </Route>
              <Route
                exact
                path="/training/themes/:categoryId/:trainingId/:levelId"
                render={({ match, ...rest }) => {
                  switch (match.params.trainingId) {
                    case '0':
                      return (
                        <Container maxWidth="lg">
                          <Game match={match} {...rest} />
                        </Container>
                      );
                    case '1':
                      return (
                        <Container maxWidth="lg">
                          <SelectTranslateTraining match={match} {...rest} />
                        </Container>
                      );
                    default:
                      return null;
                  }
                }}
              />
            </Switch>
          </ErrorBoundary>
        </PageContainer>
      </Suspense>
    </Router>
  );
}

export { history };
export default App;
