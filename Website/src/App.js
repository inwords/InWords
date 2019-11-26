import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { useSelector } from 'react-redux';
import Container from 'src/components/Container';
import PageProgress from 'src/components/PageProgress';
import ScrollToTop from 'src/components/ScrollToTop';
import SmartSnackbar from 'src/components/SmartSnackbar';
import PageContainer from 'src/components/PageContainer';
import ProfileMenuButton from 'src/components/ProfileMenuButton';
import ErrorBoundary from 'src/components/ErrorBoundary';

const SignIn = lazy(() => import('./routes/SignIn'));
const SignUp = lazy(() => import('./routes/SignUp'));
const Profile = lazy(() => import('./routes/Profile'));
const Dictionary = lazy(() => import('./routes/Dictionary'));
const TrainingCategories = lazy(() => import('./routes/TrainingCategories'));
const TrainingTypes = lazy(() => import('./routes/TrainingTypes'));
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
    text: 'Словарь'
  },
  {
    to: '/training',
    text: 'Обучение',
    nestedRoutes: [
      {
        to: '/training/main',
        text: 'Курсы'
      },
      {
        to: '/training/history',
        text: 'История'
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
      <ErrorBoundary>
        <Suspense fallback={<PageProgress />}>
          <PageContainer
            routes={userId ? routes : undefined}
            rightNodes={userId ? [<ProfileMenuButton key={0} />] : undefined}
          >
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
              <Route path="/dictionary">
                <Container maxWidth="md">
                  <Dictionary />
                </Container>
              </Route>
              <Route exact path="/training">
                <Redirect to="/training/main" />
              </Route>
              <Route exact path="/training/main">
                <Container maxWidth="lg">
                  <TrainingCategories />
                </Container>
              </Route>
              <Route exact path="/training/history">
                <Container maxWidth="lg">
                  <TrainingHistory />
                </Container>
              </Route>
              <Route exact path="/training/:categoryId">
                <Container maxWidth="lg">
                  <TrainingTypes />
                </Container>
              </Route>
              <Route exact path="/training/:categoryId/:trainingId">
                <Container maxWidth="lg">
                  <TrainingLevels />
                </Container>
              </Route>
              <Route
                path="/training/:categoryId/:trainingId/:levelId"
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
          </PageContainer>
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
}

export { history };
export default App;
