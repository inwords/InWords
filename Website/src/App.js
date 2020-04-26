import React, { Suspense, lazy } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import history from 'src/history';
import useOAuth2 from 'src/components/app/useOAuth2';
import ErrorBoundary from 'src/components/app/ErrorBoundary';
import Container from 'src/components/core/Container';
import ScrollToTop from 'src/components/core/ScrollToTop';
import PageProgress from 'src/components/app/PageProgress';
import SmartSnackbar from 'src/components/app/SmartSnackbar';
import PageContainer from 'src/components/app/PageContainer';
import ControlledProfileMenu from 'src/components/app/ControlledProfileMenu';
import NotFound from 'src/components/routes/NotFound';
import TrainingRouter from 'src/routers/TrainingRouter';
import DictionaryRouter from 'src/routers/DictionaryRouter';

const SignIn = lazy(() =>
  import(/* webpackPrefetch: true */ 'src/components/routes/SignIn')
);
const SignUp = lazy(() =>
  import(/* webpackPrefetch: true */ 'src/components/routes/SignUp')
);
const Profile = lazy(() =>
  import(/* webpackPrefetch: true */ 'src/components/routes/Profile')
);

const routes = [
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
        routes={userId ? routes : null}
        rightNodes={userId ? [<ControlledProfileMenu key={0} />] : null}
      >
        <ErrorBoundary>
          <Suspense fallback={<PageProgress />}>
            <Switch>
              <Route exact path="/">
                {userId ? (
                  <Redirect to="/training" />
                ) : (
                  <Redirect to="/sign-in" />
                )}
              </Route>
              <Route path="/sign-in">
                <Container maxWidth="xs">
                  <SignIn />
                </Container>
              </Route>
              <Route path="/sign-up">
                <Container maxWidth="xs">
                  <SignUp />
                </Container>
              </Route>
              <Route path="/profile">
                <Container maxWidth="md">
                  <Profile />
                </Container>
              </Route>
              <Route path="/dictionary">
                <DictionaryRouter />
              </Route>
              <Route path="/training">
                <TrainingRouter />
              </Route>
              <Route path="*">
                <NotFound />
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
