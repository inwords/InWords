import React, { Fragment, Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Container from 'src/components/core/Container';
import ScrollToTop from 'src/components/core/ScrollToTop';
import PageProgress from 'src/components/layout/PageProgress';
import SmartSnackbar from 'src/components/layout/SmartSnackbar';
import PageContainer from 'src/components/layout/PageContainer';
import ProfileMenuButton from 'src/components/layout/ProfileMenuButton';
import ErrorBoundary from 'src/components/layout/ErrorBoundary';
import TrainingRouter from 'src/routers/TrainingRouter';
import DictionaryRouter from 'src/routers/DictionaryRouter';

const SignIn = lazy(() => import('src/components/routes/SignIn'));
const SignUp = lazy(() => import('src/components/routes/SignUp'));
const Profile = lazy(() => import('src/components/routes/Profile'));

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
  const userId = useSelector(store => store.access.userId);

  return (
    <Fragment>
      <ScrollToTop />
      <PageContainer
        routes={userId ? routes : null}
        rightNodes={userId ? [<ProfileMenuButton key={0} />] : null}
      >
        <ErrorBoundary>
          <Suspense fallback={<PageProgress />}>
            <Switch>
              <Route exact path="/">
                {!userId ? (
                  <Redirect to="/sign-in" />
                ) : (
                  <Redirect to="/training" />
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
            </Switch>
          </Suspense>
        </ErrorBoundary>
      </PageContainer>
      <SmartSnackbar />
    </Fragment>
  );
}

export default App;
