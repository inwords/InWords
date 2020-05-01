import React, { Suspense, lazy } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import history from 'src/history';
import useOAuth2 from 'src/components/app/useOAuth2';
import ErrorBoundary from 'src/components/app/ErrorBoundary';
import RouteContainer from 'src/components/app-common/RouteContainer';
import ScrollToTop from 'src/components/core/ScrollToTop';
import PageProgress from 'src/components/app/PageProgress';
import SmartSnackbar from 'src/components/app/SmartSnackbar';
import PageContainer from 'src/components/app/PageContainer';
import ControlledProfileMenu from 'src/components/app/ControlledProfileMenu';
import NotFound from 'src/components/routes/NotFound';
import TrainingRouter from 'src/routers/TrainingRouter';
import DictionaryRouter from 'src/routers/DictionaryRouter';

const Homepage = lazy(() =>
  import(/* webpackPrefetch: true */ 'src/components/routes/Homepage')
);
const SignIn = lazy(() =>
  import(/* webpackPrefetch: true */ 'src/components/routes/SignIn')
);
const SignUp = lazy(() =>
  import(/* webpackPrefetch: true */ 'src/components/routes/SignUp')
);
const Profile = lazy(() =>
  import(/* webpackPrefetch: true */ 'src/components/routes/Profile')
);

const commonRoutes = [
  {
    to: '/sign-in',
    text: 'Вход'
  },
  {
    to: '/sign-up',
    text: 'Регистрация'
  }
];

const privateRoutes = [
  {
    to: '/dictionary',
    text: 'Словарь'
  },
  {
    to: '/training',
    text: 'Обучение',
    nestedRoutes: [
      {
        to: '/training/main/0',
        text: 'Тренировки'
      },
      {
        to: '/training/history',
        text: 'История'
      },
      {
        to: '/training/courses',
        text: 'Курсы'
      }
    ]
  }
];

function App() {
  const userId = useSelector(store => store.auth.userId);

  useOAuth2();

  return (
    <Router history={history}>
      <ScrollToTop />
      <PageContainer
        routes={userId ? privateRoutes : commonRoutes}
        rightNodes={userId ? [<ControlledProfileMenu key={0} />] : null}
      >
        <ErrorBoundary>
          <Suspense fallback={<PageProgress />}>
            <Switch>
              <Route exact path="/">
                {userId ? <Redirect to="/training" /> : <Redirect to="/home" />}
              </Route>
              <Route path="/home">
                <Homepage />
              </Route>
              <Route path="/sign-in">
                <RouteContainer maxWidth="xs">
                  <SignIn />
                </RouteContainer>
              </Route>
              <Route path="/sign-up">
                <RouteContainer maxWidth="xs">
                  <SignUp />
                </RouteContainer>
              </Route>
              <Route path="/profile">
                <RouteContainer maxWidth="md">
                  <Profile />
                </RouteContainer>
              </Route>
              <Route path="/dictionary">
                <DictionaryRouter />
              </Route>
              <Route path="/training">
                <TrainingRouter />
              </Route>
              <Route path="*">
                <RouteContainer maxWidth="md">
                  <NotFound />
                </RouteContainer>
              </Route>
            </Switch>
          </Suspense>
        </ErrorBoundary>
      </PageContainer>
      <SmartSnackbar />
    </Router>
  );
}

export default App;
