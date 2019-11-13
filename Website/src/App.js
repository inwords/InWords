import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { useSelector } from 'react-redux';
import Container from '@material-ui/core/Container';
import PageProgress from 'src/components/PageProgress';
import ScrollToTop from 'src/components/ScrollToTop';
import SmartSnackbar from 'src/components/SmartSnackbar';
import PageWrapper from 'src/components/PageWrapper';
import AuthorizedPageWrapper from 'src/components/AuthorizedPageWrapper';
import TrainingPageWrapper from 'src/components/TrainingPageWrapper';
import ErrorBoundary from 'src/components/ErrorBoundary';

const SignIn = lazy(() => import('./routes/SignIn'));
const SignUp = lazy(() => import('./routes/SignUp'));
const Profile = lazy(() => import('./routes/Profile'));
const ProfileSettings = lazy(() => import('./routes/ProfileSettings'));
const Account = lazy(() => import('./routes/Account'));
const Dictionary = lazy(() => import('./routes/Dictionary'));
const TrainingCategories = lazy(() => import('./routes/TrainingCategories'));
const TrainingTypes = lazy(() => import('./routes/TrainingTypes'));
const TrainingLevels = lazy(() => import('./routes/TrainingLevels'));
const Game = lazy(() => import('./routes/Game'));
const SelectTranslateTraining = lazy(() =>
  import('./routes/SelectTranslateTraining')
);

const history = createBrowserHistory();

function App() {
  const userId = useSelector(store => store.access.userId);

  return (
    <Router history={history}>
      <ScrollToTop />
      <SmartSnackbar />
      <ErrorBoundary>
        <Suspense fallback={<PageProgress />}>
          <Switch>
            <Route
              exact
              path="/"
              render={() =>
                !userId ? (
                  <Redirect to="/signIn" />
                ) : (
                  <Redirect to="/dictionary" />
                )
              }
            />
            <Route
              exact
              path="/profile"
              render={() => <Redirect to={`/profile/${userId}`} />}
            />
            <Route path="/signIn">
              <PageWrapper>
                <Container maxWidth="xs">
                  <SignIn />
                </Container>
              </PageWrapper>
            </Route>
            <Route path="/signUp">
              <PageWrapper>
                <Container maxWidth="xs">
                  <SignUp />
                </Container>
              </PageWrapper>
            </Route>
            <Route path="/profile/:userId">
              <AuthorizedPageWrapper>
                <Profile />
              </AuthorizedPageWrapper>
            </Route>
            <Route path="/profileSettings">
              <AuthorizedPageWrapper>
                <Container component="div" maxWidth="sm">
                  <ProfileSettings />
                </Container>
              </AuthorizedPageWrapper>
            </Route>
            <Route path="/account">
              <AuthorizedPageWrapper>
                <Container component="div" maxWidth="sm">
                  <Account />
                </Container>
              </AuthorizedPageWrapper>
            </Route>
            <Route path="/dictionary">
              <AuthorizedPageWrapper>
                <Container component="div" maxWidth="md">
                  <Dictionary />
                </Container>
              </AuthorizedPageWrapper>
            </Route>
            <Route exact path="/trainings">
              <TrainingPageWrapper>
                <Container component="div" maxWidth="lg">
                  <TrainingCategories />
                </Container>
              </TrainingPageWrapper>
            </Route>
            <Route exact path="/trainings/:categoryId">
              <TrainingPageWrapper>
                <Container component="div" maxWidth="lg">
                  <TrainingTypes />
                </Container>
              </TrainingPageWrapper>
            </Route>
            <Route exact path="/trainings/:categoryId/:trainingId">
              <TrainingPageWrapper>
                <Container component="div" maxWidth="lg">
                  <TrainingLevels />
                </Container>
              </TrainingPageWrapper>
            </Route>
            <Route
              path="/trainings/:categoryId/:trainingId/:levelId"
              render={({ match, ...rest }) => {
                switch (match.params.trainingId) {
                  case '0':
                    return (
                      <TrainingPageWrapper>
                        <Container component="div" maxWidth="lg">
                          <Game match={match} {...rest} />
                        </Container>
                      </TrainingPageWrapper>
                    );
                  case '1':
                    return (
                      <TrainingPageWrapper>
                        <Container component="div" maxWidth="lg">
                          <SelectTranslateTraining match={match} {...rest} />
                        </Container>
                      </TrainingPageWrapper>
                    );
                  default:
                    return null;
                }
              }}
            />
          </Switch>
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
}

export { history };
export default App;
