import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import history from 'src/history';
import FocusVisibleManager from 'src/components/core/FocusVisibleManager';
import OAuth2Manager from 'src/components/app/OAuth2Manager';
import ErrorBoundary from 'src/components/app/ErrorBoundary';
import RouteContainer from 'src/components/app-common/RouteContainer';
import ScrollToTop from 'src/components/core/ScrollToTop';
import PageProgress from 'src/components/app/PageProgress';
import SmartSnackbar from 'src/components/app/SmartSnackbar';
import PageContainer from 'src/components/app/PageContainer';
import ControlledProfileMenu from 'src/components/app/ControlledProfileMenu';
import NotFound from 'src/components/routes/NotFound';
import Homepage from 'src/components/routes/Homepage';
import SignIn from 'src/components/routes/SignIn';
import SignUp from 'src/components/routes/SignUp';
import Profile from 'src/components/routes/Profile';

const DictionaryRouter = lazy(() =>
  import(/* webpackPrefetch: true */ 'src/routers/DictionaryRouter')
);
const TrainingRouter = lazy(() =>
  import(/* webpackPrefetch: true */ 'src/routers/TrainingRouter')
);
const HistoryRouter = lazy(() =>
  import(/* webpackPrefetch: true */ 'src/routers/HistoryRouter')
);
const CoursesRouter = lazy(() =>
  import(/* webpackPrefetch: true */ 'src/routers/CoursesRouter')
);

const privateRoutes = [
  {
    to: '/dictionary',
    text: 'Словарь'
  },
  {
    to: '/training',
    text: 'Тренировки'
  },
  {
    to: '/history',
    text: 'История'
  },
  {
    to: '/courses',
    text: 'Курсы'
  }
];

function App() {
  const userId = useSelector(store => store.auth.userId);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <FocusVisibleManager>
        <OAuth2Manager>
          <PageContainer
            routes={userId ? privateRoutes : null}
            rightNodes={[
              <ControlledProfileMenu key={0} authorized={Boolean(userId)} />
            ]}
          >
            <ErrorBoundary>
              <Suspense fallback={<PageProgress />}>
                <Switch>
                  <Route exact path="/">
                    {userId ? (
                      <Redirect to="/training" />
                    ) : (
                      <Redirect to="/home" />
                    )}
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
                  <Route path="/history">
                    <HistoryRouter />
                  </Route>
                  <Route path="/courses">
                    <CoursesRouter />
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
        </OAuth2Manager>
      </FocusVisibleManager>
      <SmartSnackbar />
    </BrowserRouter>
  );
}

export default App;
