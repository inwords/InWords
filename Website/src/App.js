import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { useSelector } from 'react-redux';
import PageProgress from 'src/components/PageProgress';
import ScrollToTop from 'src/components/ScrollToTop';
import SmartSnackbar from 'src/components/SmartSnackbar';
import PageWrapper from 'src/components/PageWrapper/PageWrapper';
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
                <SignIn />
              </PageWrapper>
            </Route>
            <Route path="/signUp">
              <PageWrapper>
                <SignUp />
              </PageWrapper>
            </Route>
            <Route path="/profile/:userId">
              <PageWrapper authorized>
                <Profile />
              </PageWrapper>
            </Route>
            <Route path="/profileSettings">
              <PageWrapper authorized>
                <ProfileSettings />
              </PageWrapper>
            </Route>
            <Route path="/account">
              <PageWrapper authorized>
                <Account />
              </PageWrapper>
            </Route>
            <Route path="/dictionary">
              <PageWrapper authorized>
                <Dictionary />
              </PageWrapper>
            </Route>
            <Route exact path="/trainings">
              <PageWrapper authorized>
                <TrainingCategories />
              </PageWrapper>
            </Route>
            <Route exact path="/trainings/:categoryId">
              <PageWrapper authorized>
                <TrainingTypes />
              </PageWrapper>
            </Route>
            <Route exact path="/trainings/:categoryId/:trainingId">
              <PageWrapper authorized>
                <TrainingLevels />
              </PageWrapper>
            </Route>
            <Route
              path="/trainings/:categoryId/:trainingId/:levelId"
              render={({ match, ...rest }) => {
                switch (match.params.trainingId) {
                  case '0':
                    return (
                      <PageWrapper authorized>
                        <Game match={match} {...rest} />
                      </PageWrapper>
                    );
                  case '1':
                    return (
                      <PageWrapper authorized>
                        <SelectTranslateTraining match={match} {...rest} />
                      </PageWrapper>
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
