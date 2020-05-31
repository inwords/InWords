import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import RouteContainer from 'src/components/app-common/RouteContainer';
import Breadcrumbs from 'src/components/core/Breadcrumbs';
import BreadcrumbsLink from 'src/components/core/BreadcrumbsLink';
import Dictionary from 'src/components/routes/Dictionary';
import DictionaryTrainingTypes from 'src/components/routes/DictionaryTrainingTypes';
import MainTrainingConveyor from 'src/components/routes/MainTrainingConveyor';

function DictionaryRouter() {
  const { url } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={url}>
        <RouteContainer maxWidth="md">
          <Dictionary />
        </RouteContainer>
      </Route>
      <Route exact path={`${url}/-1`}>
        <RouteContainer maxWidth="md">
          <Breadcrumbs>
            <BreadcrumbsLink to={url}>Словарь</BreadcrumbsLink>
            <BreadcrumbsLink to={`${url}/-1`}>Тренировки</BreadcrumbsLink>
          </Breadcrumbs>
          <DictionaryTrainingTypes />
        </RouteContainer>
      </Route>
      <Route
        exact
        path={`${url}/:levelId/=)`}
        render={({ match: { params } }) => (
          <RouteContainer maxWidth="md">
            <Breadcrumbs>
              <BreadcrumbsLink to={url}>Словарь</BreadcrumbsLink>
              <BreadcrumbsLink to={`${url}/-1`}>Тренировки</BreadcrumbsLink>
              <BreadcrumbsLink to={`${url}/${params.levelId}/=)`}>
                Тренировка
              </BreadcrumbsLink>
            </Breadcrumbs>
            <MainTrainingConveyor redirectionUrl="/dictionary" />
          </RouteContainer>
        )}
      />
    </Switch>
  );
}

export default DictionaryRouter;
