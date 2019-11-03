import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import SmartSnackbar from 'src/components/SmartSnackbar';
import PageWrapper from 'src/layout/PageWrapper';
import ErrorBoundary from 'src/layout/ErrorBoundary';

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

const useStyles = makeStyles(theme => ({
  progress: {
    display: 'block',
    margin: 'auto'
  }
}));

function App() {
  const classes = useStyles();
  const userId = useSelector(store => store.access.userId);

  return (
    <Router history={history}>
      <SmartSnackbar />
      <ErrorBoundary>
        <Suspense fallback={<CircularProgress className={classes.progress} />}>
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
              <PageWrapper
                authorized
                sideRoutes={[
                  {
                    to: '/trainings',
                    text: 'Все категории'
                  }
                ]}
              >
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
