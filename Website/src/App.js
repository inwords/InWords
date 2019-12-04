import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { useSelector } from 'react-redux';
import Container from 'src/components/Container';
import PageProgress from 'src/components/PageProgress';
import ScrollToTop from 'src/components/ScrollToTop';
import SmartSnackbar from 'src/layout/SmartSnackbar';
import PageContainer from 'src/layout/PageContainer';
import ProfileMenuButton from 'src/layout/ProfileMenuButton';
import ErrorBoundary from 'src/layout/ErrorBoundary';
import TrainingRouter from './TrainingRouter';

const SignIn = lazy(() => import('./routes/SignIn'));
const SignUp = lazy(() => import('./routes/SignUp'));
const Profile = lazy(() => import('./routes/Profile'));
const DictionaryMain = lazy(() => import('./routes/DictionaryMain'));
const Dictionary = lazy(() => import('./routes/Dictionary'));

const history = createBrowserHistory();

const routes = [
  {
    to: '/dictionary',
    text: 'Словарь',
    nestedRoutes: [
      {
        to: '/dictionary/main',
        text: 'Главная'
      },
      {
        to: '/dictionary/my',
        text: 'Мой словарь'
      }
    ]
  },
  {
    to: '/training',
    text: 'Обучение',
    nestedRoutes: [
      {
        to: '/training/main',
        text: 'Тренировки'
      },
      {
        to: '/training/history',
        text: 'История'
      },
      {
        to: '/training/themes',
        text: 'Темы'
      }
    ]
  }
];

function App() {
  const userId = useSelector(store => store.access.userId);

  return (
    <Router history={history}>
      <ScrollToTop />
      <SmartSnackbar />
      <Suspense fallback={<PageProgress />}>
        <PageContainer
          routes={userId ? routes : undefined}
          rightNodes={userId ? [<ProfileMenuButton key={0} />] : undefined}
        >
          <ErrorBoundary>
            <Switch>
              <Route exact path="/">
                {!userId ? (
                  <Redirect to="/signIn" />
                ) : (
                  <Redirect to="/dictionary" />
                )}
              </Route>
              <Route path="/signIn">
                <Container maxWidth="xs">
                  <SignIn />
                </Container>
              </Route>
              <Route path="/signUp">
                <Container maxWidth="xs">
                  <SignUp />
                </Container>
              </Route>
              <Route path="/profile">
                <Container maxWidth="md">
                  <Profile />
                </Container>
              </Route>
              <Route exact path="/dictionary">
                <Redirect to="/dictionary/main" />
              </Route>
              <Route path="/dictionary/main">
                <Container maxWidth="md">
                  <DictionaryMain />
                </Container>
              </Route>
              <Route path="/dictionary/my">
                <Container maxWidth="md">
                  <Dictionary />
                </Container>
              </Route>
              <Route path="/training">
                <TrainingRouter />
              </Route>
            </Switch>
          </ErrorBoundary>
        </PageContainer>
      </Suspense>
    </Router>
  );
}

export { history };
export default App;
