import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { useSelector } from 'react-redux';
import Container from '@material-ui/core/Container';
import PageProgress from 'src/components/PageProgress';
import ScrollToTop from 'src/components/ScrollToTop';
import SmartSnackbar from 'src/components/SmartSnackbar';
import PageContainer from 'src/components/PageContainer';
import AuthorizedPageContainer from 'src/components/AuthorizedPageContainer';
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
const TrainingHistory = lazy(() => import('./routes/TrainingHistory'));
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
            <Route exact path="/">
              {!userId ? (
                <Redirect to="/signIn" />
              ) : (
                <Redirect to="/dictionary" />
              )}
            </Route>
            <Route exact path="/profile">
              {<Redirect to={`/profile/${userId}`} />}
            </Route>
            <Route path="/signIn">
              <PageContainer>
                <Container maxWidth="xs">
                  <SignIn />
                </Container>
              </PageContainer>
            </Route>
            <Route path="/signUp">
              <PageContainer>
                <Container maxWidth="xs">
                  <SignUp />
                </Container>
              </PageContainer>
            </Route>
            <Route path="/profile/:userId">
              <AuthorizedPageContainer>
                <Profile />
              </AuthorizedPageContainer>
            </Route>
            <Route path="/profileSettings">
              <AuthorizedPageContainer>
                <Container component="div" maxWidth="sm">
                  <ProfileSettings />
                </Container>
              </AuthorizedPageContainer>
            </Route>
            <Route path="/account">
              <AuthorizedPageContainer>
                <Container component="div" maxWidth="sm">
                  <Account />
                </Container>
              </AuthorizedPageContainer>
            </Route>
            <Route path="/dictionary">
              <AuthorizedPageContainer>
                <Container component="div" maxWidth="md">
                  <Dictionary />
                </Container>
              </AuthorizedPageContainer>
            </Route>
            <Route exact path="/training">
              <Redirect to="/training/main" />
            </Route>
            <Route exact path="/training/main">
              <AuthorizedPageContainer>
                <Container component="div" maxWidth="lg">
                  <TrainingCategories />
                </Container>
              </AuthorizedPageContainer>
            </Route>
            <Route exact path="/training/history">
              <AuthorizedPageContainer>
                <Container component="div" maxWidth="lg">
                  <TrainingHistory />
                </Container>
              </AuthorizedPageContainer>
            </Route>
            <Route exact path="/training/:categoryId">
              <AuthorizedPageContainer>
                <Container component="div" maxWidth="lg">
                  <TrainingTypes />
                </Container>
              </AuthorizedPageContainer>
            </Route>
            <Route exact path="/training/:categoryId/:trainingId">
              <AuthorizedPageContainer>
                <Container component="div" maxWidth="lg">
                  <TrainingLevels />
                </Container>
              </AuthorizedPageContainer>
            </Route>
            <Route
              path="/training/:categoryId/:trainingId/:levelId"
              render={({ match, ...rest }) => {
                switch (match.params.trainingId) {
                  case '0':
                    return (
                      <AuthorizedPageContainer>
                        <Container component="div" maxWidth="lg">
                          <Game match={match} {...rest} />
                        </Container>
                      </AuthorizedPageContainer>
                    );
                  case '1':
                    return (
                      <AuthorizedPageContainer>
                        <Container component="div" maxWidth="lg">
                          <SelectTranslateTraining match={match} {...rest} />
                        </Container>
                      </AuthorizedPageContainer>
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
