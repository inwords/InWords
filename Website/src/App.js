import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import CustomSnackbar from 'components/CustomSnackbar';
import PageLayout from 'components/PageLayout';
import ErrorBoundary from 'components/ErrorBoundary';

const SignIn = lazy(() => import('./pages/SignIn'));
const SignUp = lazy(() => import('./pages/SignUp'));
const Profile = lazy(() => import('./pages/Profile'));
const ProfileSettings = lazy(() => import('./pages/ProfileSettings'));
const Account = lazy(() => import('./pages/Account'));
const Dictionary = lazy(() => import('./pages/Dictionary'));
const TrainingCategories = lazy(() => import('./pages/TrainingCategories'));
const TrainingTypes = lazy(() => import('./pages/TrainingTypes'));
const TrainingLevels = lazy(() => import('./pages/TrainingLevels'));
const Game = lazy(() => import('./pages/Game'));
const SelectTranslateTraining = lazy(() =>
  import('./pages/SelectTranslateTraining')
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
      <CustomSnackbar />
      <PageLayout authorized={Boolean(userId)}>
        <ErrorBoundary>
          <Suspense
            fallback={<CircularProgress className={classes.progress} />}
          >
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
              <Route path="/signIn" component={SignIn} />
              <Route path="/signUp" component={SignUp} />
              <Route path="/profile/:userId" component={Profile} />
              <Route path="/profileSettings" component={ProfileSettings} />
              <Route path="/account" component={Account} />
              <Route path="/dictionary" component={Dictionary} />
              <Route exact path="/trainings" component={TrainingCategories} />
              <Route
                exact
                path="/trainings/:categoryId"
                component={TrainingTypes}
              />
              <Route
                exact
                path="/trainings/:categoryId/:trainingId"
                component={TrainingLevels}
              />
              <Route
                path="/trainings/:categoryId/:trainingId/:levelId"
                render={({ match, ...rest }) => {
                  switch (match.params.trainingId) {
                    case '0':
                      return <Game match={match} {...rest} />;
                    case '1':
                      return (
                        <SelectTranslateTraining match={match} {...rest} />
                      );
                    default:
                      return null;
                  }
                }}
              />
            </Switch>
          </Suspense>
        </ErrorBoundary>
      </PageLayout>
    </Router>
  );
}

export { history };
export default App;
