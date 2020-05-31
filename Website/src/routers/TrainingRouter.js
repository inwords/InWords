import React from 'react';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom';
import RouteContainer from 'src/components/app-common/RouteContainer';
import Breadcrumbs from 'src/components/core/Breadcrumbs';
import BreadcrumbsLink from 'src/components/core/BreadcrumbsLink';
import MainTrainingTypes from 'src/components/routes/MainTrainingTypes';
import MainTrainingConveyor from 'src/components/routes/MainTrainingConveyor';

function TrainingRouter() {
  const { url } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={url}>
        <Redirect to={`${url}/0`} />
      </Route>
      <Route exact path={`${url}/0`}>
        <RouteContainer maxWidth="md">
          <MainTrainingTypes />
        </RouteContainer>
      </Route>
      <Route
        exact
        path={`${url}/:levelId/=)`}
        render={({ match: { params } }) => (
          <RouteContainer maxWidth="md">
            <Breadcrumbs>
              <BreadcrumbsLink to={`${url}/0`}>Тренировки</BreadcrumbsLink>
              <BreadcrumbsLink to={`${url}/${params.levelId}/=)`}>
                Тренировка
              </BreadcrumbsLink>
            </Breadcrumbs>
            <MainTrainingConveyor redirectionUrl="/training/0" />
          </RouteContainer>
        )}
      />
    </Switch>
  );
}

export default TrainingRouter;
