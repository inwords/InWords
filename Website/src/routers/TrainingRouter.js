import React, { lazy } from 'react';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom';
import Container from 'src/components/Container';
import Breadcrumbs from 'src/components/Breadcrumbs';
import BreadcrumbsLink from 'src/components/BreadcrumbsLink';

const MainTrainings = lazy(() => import('src/routes/MainTrainings'));
const TrainingHistory = lazy(() => import('src/routes/TrainingHistory'));
const MainTrainingSwitcher = lazy(() =>
  import('src/routes/MainTrainingSwitcher')
);
const HistoryTrainingSwitcher = lazy(() =>
  import('src/routes/HistoryTrainingSwitcher')
);

function TrainingRouter() {
  const { url } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={url}>
        <Redirect to={`${url}/main/0`} />
      </Route>
      <Route exact path={`${url}/main/0`}>
        <Container maxWidth="lg">
          <MainTrainings />
        </Container>
      </Route>
      <Route
        exact
        path={`${url}/main/:levelId/:trainingId`}
        render={({ match: { params } }) => (
          <Container maxWidth="lg">
            <Breadcrumbs>
              <BreadcrumbsLink to={`${url}/main/0`}>Тренировки</BreadcrumbsLink>
              <BreadcrumbsLink
                to={`${url}/main/${params.levelId}/${params.trainingId}`}
              >
                Тренировка
              </BreadcrumbsLink>
            </Breadcrumbs>
            <MainTrainingSwitcher trainingId={+params.trainingId} />
          </Container>
        )}
      ></Route>
      <Route exact path={`${url}/history`}>
        <Container maxWidth="lg">
          <TrainingHistory />
        </Container>
      </Route>
      <Route
        exact
        path={`${url}/history/:levelId/:trainingId`}
        render={({ match: { params } }) => (
          <Container maxWidth="lg">
            <Breadcrumbs>
              <BreadcrumbsLink to={`${url}/history`}>История</BreadcrumbsLink>
              <BreadcrumbsLink
                to={`${url}/history/${params.levelId}/${params.trainingId}`}
              >
                Тренировка
              </BreadcrumbsLink>
            </Breadcrumbs>
            <HistoryTrainingSwitcher trainingId={+params.trainingId} />
          </Container>
        )}
      ></Route>
    </Switch>
  );
}

export default TrainingRouter;
