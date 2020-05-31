import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import RouteContainer from 'src/components/app-common/RouteContainer';
import Breadcrumbs from 'src/components/core/Breadcrumbs';
import BreadcrumbsLink from 'src/components/core/BreadcrumbsLink';
import WordSets from 'src/components/routes/WordSets';
import WordSetPairs from 'src/components/routes/WordSetPairs';
import WordSetLevels from 'src/components/routes/WordSetLevels';
import WordSetTrainingConveyor from 'src/components/routes/WordSetTrainingConveyor';

function CoursesRouter() {
  const { url } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={url}>
        <RouteContainer maxWidth="lg">
          <WordSets />
        </RouteContainer>
      </Route>
      <Route
        exact
        path={`${url}/:wordSetId/word-pairs`}
        render={({ match: { params } }) => (
          <RouteContainer maxWidth="md">
            <Breadcrumbs>
              <BreadcrumbsLink to={url}>Курсы</BreadcrumbsLink>
              <BreadcrumbsLink to={`${url}/${params.wordSetId}/word-pairs`}>
                Набор слов
              </BreadcrumbsLink>
            </Breadcrumbs>
            <WordSetPairs />
          </RouteContainer>
        )}
      />
      <Route
        exact
        path={`${url}/:wordSetId`}
        render={({ match: { params } }) => (
          <RouteContainer maxWidth="lg">
            <Breadcrumbs>
              <BreadcrumbsLink to={url}>Курсы</BreadcrumbsLink>
              <BreadcrumbsLink to={`${url}/${params.wordSetId}`}>
                Уровни
              </BreadcrumbsLink>
            </Breadcrumbs>
            <WordSetLevels />
          </RouteContainer>
        )}
      />
      <Route
        exact
        path={`${url}/:wordSetId/:levelId/=)`}
        render={({ match: { params } }) => (
          <RouteContainer maxWidth="lg">
            <Breadcrumbs>
              <BreadcrumbsLink to={url}>Курсы</BreadcrumbsLink>
              <BreadcrumbsLink to={`${url}/${params.wordSetId}`}>
                Уровни
              </BreadcrumbsLink>
              <BreadcrumbsLink
                to={`${url}/${params.wordSetId}/${params.levelId}/=)`}
              >
                Тренировка
              </BreadcrumbsLink>
            </Breadcrumbs>
            <WordSetTrainingConveyor />
          </RouteContainer>
        )}
      />
    </Switch>
  );
}

export default CoursesRouter;
