import React, { lazy } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import RouteContainer from 'src/components/app-common/RouteContainer';
import Breadcrumbs from 'src/components/core/Breadcrumbs';
import BreadcrumbsLink from 'src/components/core/BreadcrumbsLink';

const WordSetHistory = lazy(() =>
  import(/* webpackPrefetch: true */ 'src/components/routes/WordSetHistory')
);
const HistoryTrainingTypes = lazy(() =>
  import(
    /* webpackPrefetch: true */ 'src/components/routes/HistoryTrainingTypes'
  )
);
const HistoryTrainingConveyor = lazy(() =>
  import(
    /* webpackPrefetch: true */ 'src/components/routes/HistoryTrainingConveyor'
  )
);

function HistoryRouter() {
  const { url } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={url}>
        <RouteContainer maxWidth="lg">
          <WordSetHistory />
        </RouteContainer>
      </Route>
      <Route
        exact
        path={`${url}/:levelId`}
        render={({ match: { params } }) => (
          <RouteContainer maxWidth="md">
            <Breadcrumbs>
              <BreadcrumbsLink to={url}>История</BreadcrumbsLink>
              <BreadcrumbsLink to={`${url}/${params.levelId}`}>
                Тренировки
              </BreadcrumbsLink>
            </Breadcrumbs>
            <HistoryTrainingTypes />
          </RouteContainer>
        )}
      />
      <Route
        exact
        path={`${url}/:levelId/=)`}
        render={({ match: { params } }) => (
          <RouteContainer maxWidth="lg">
            <Breadcrumbs>
              <BreadcrumbsLink to={url}>История</BreadcrumbsLink>
              <BreadcrumbsLink to={`${url}/${params.levelId}`}>
                Тренировки
              </BreadcrumbsLink>
              <BreadcrumbsLink to={`${url}/${params.levelId}/=)`}>
                Тренировка
              </BreadcrumbsLink>
            </Breadcrumbs>
            <HistoryTrainingConveyor />
          </RouteContainer>
        )}
      />
    </Switch>
  );
}

export default HistoryRouter;
