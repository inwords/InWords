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
const EmailChanging = lazy(() => import('./pages/EmailChanging'));
const EmailConfirmation = lazy(() => import('./pages/EmailConfirmation'));
const Profile = lazy(() => import('./pages/Profile'));
const ProfileSettings = lazy(() => import('./pages/ProfileSettings'));
const Wordlist = lazy(() => import('./pages/Wordlist'));
const Games = lazy(() => import('./pages/Games'));
const GameLevels = lazy(() => import('./pages/GameLevels'));
const Game = lazy(() => import('./pages/Game'));
const Game2 = lazy(() => import('./pages/Game2'));

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
                    <Redirect to="/wordlist" />
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
              <Route path="/emailChanging" component={EmailChanging} />
              <Route path="/emailConfirmation/:email" component={EmailConfirmation} />
              <Route path="/profile/:userId" component={Profile} />
              <Route path="/profileSettings" component={ProfileSettings} />
              <Route path="/wordlist" component={Wordlist} />
              <Route exact path="/games" component={Games} />
              <Route exact path="/games/:gameId" component={GameLevels} />
              <Route path="/games/:gameId/:levelId" component={Game} />
              <Route path="/games2/:gameId/:levelId" component={Game2} />
            </Switch>
          </Suspense>
        </ErrorBoundary>
      </PageLayout>
    </Router>
  );
}

export { history };
export default App;
