import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import CustomSnackbar from 'src/components/CustomSnackbar';
import PageLayout from 'src/layout/PageLayout';
import ErrorBoundary from 'src/layout/ErrorBoundary';

import Header from 'src/layout/Header';

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
      {/* <Header /> */}
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
