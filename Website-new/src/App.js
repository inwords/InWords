import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import history from './history';
import Fallback from './components/Fallback';
import MainSnackbar from './components/MainSnackbar';
import PageLayout from './components/PageLayout';

const SignIn = lazy(() => import('./pages/SignIn'));
const SignUp = lazy(() => import('./pages/SignUp'));
const Profile = lazy(() => import('./pages/Profile'));
const ProfileSettings = lazy(() => import('./pages/ProfileSettings'));
const Wordlist = lazy(() => import('./pages/Wordlist'));

function App() {
  const userId = useSelector(store => store.access.userId);
  const loading = useSelector(store => store.common.loading);

  return (
    <Router history={history}>
      <MainSnackbar />
      <PageLayout
        authorized={Boolean(userId)}
        loading={loading}
      >
        <Suspense fallback={<Fallback />}>
          <Switch>
            <Route exact path="/" render={() =>
              !userId ?
                <Redirect to="/signIn" /> :
                <Redirect to="/wordlist" />}
            />
            <Route exact path="/profile" render={() =>
              <Redirect to={`/profile/${userId}`} />}
            />
            <Route path="/signIn" component={SignIn} />
            <Route path="/signUp" component={SignUp} />
            <Route path="/profile/:userId" component={Profile} />
            <Route path="/profileSettings" component={ProfileSettings} />
            <Route path="/wordlist" component={Wordlist} />
          </Switch>
        </Suspense>
      </PageLayout>
    </Router>
  );
}

export default App;
