import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import history from './history';
import Fallback from './components/Fallback';
import MainSnackbar from './components/MainSnackbar';
import PageLayout from './components/PageLayout';

const SignIn = lazy(() => import('./pages/SignIn'));
const SignUp = lazy(() => import('./pages/SignUp'));

function App() {
  const { userId } = useSelector(store => store.access.userId);

  return (
    <Router history={history}>
      <MainSnackbar />
      <PageLayout>
        <Suspense fallback={<Fallback />}>
          <Switch>
            <Route exact path="/" render={() =>
              !userId ?
                <Redirect to="/signIn" /> :
                <Redirect to="/wordlist" />} />
            <Route path="/signIn" component={SignIn} />
            <Route path="/signUp" component={SignUp} />
          </Switch>
        </Suspense>
      </PageLayout>
    </Router>
  );
}

export default App;
