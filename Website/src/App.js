import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { useSelector } from 'react-redux';
import Fallback from 'components/Fallback';
import MainSnackbar from 'components/MainSnackbar';
import PageLayout from 'components/PageLayout';

const SignIn = lazy(() => import('./pages/SignIn'));
const SignUp = lazy(() => import('./pages/SignUp'));
const Profile = lazy(() => import('./pages/Profile'));
const ProfileSettings = lazy(() => import('./pages/ProfileSettings'));
const Wordlist = lazy(() => import('./pages/Wordlist'));
const Games = lazy(() => import('./pages/Games'));
const GameLevels = lazy(() => import('./pages/GameLevels'));
const Game = lazy(() => import('./pages/Game'));

export const history = createBrowserHistory();

function App() {
  const userId = useSelector(store => store.access.userId);

  return (
    <Router history={history}>
      <MainSnackbar />
      <PageLayout authorized={Boolean(userId)}>
        <Suspense fallback={<Fallback />}>
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
            <Route path="/profile/:userId" component={Profile} />
            <Route path="/profileSettings" component={ProfileSettings} />
            <Route path="/wordlist" component={Wordlist} />
            <Route path="/games" component={Games} />
            <Route path="/game/:gameId" component={GameLevels} />
            <Route path="/gameLevel/:levelId" component={Game} />
          </Switch>
        </Suspense>
      </PageLayout>
    </Router>
  );
}

export default App;
