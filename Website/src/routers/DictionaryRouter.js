import React, { lazy } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import RouteContainer from 'src/components/app-common/RouteContainer';
import Breadcrumbs from 'src/components/core/Breadcrumbs';
import BreadcrumbsLink from 'src/components/core/BreadcrumbsLink';

const Dictionary = lazy(() =>
  import(/* webpackPrefetch: true */ 'src/components/routes/Dictionary')
);
const DictionaryTrainingTypes = lazy(() =>
  import(
    /* webpackPrefetch: true */ 'src/components/routes/DictionaryTrainingTypes'
  )
);
const MainTrainingSwitcher = lazy(() =>
  import(
    /* webpackPrefetch: true */ 'src/components/routes/MainTrainingSwitcher'
  )
);

function DictionaryRouter() {
  const { url } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={url}>
        <RouteContainer maxWidth="md">
          <Dictionary />
        </RouteContainer>
      </Route>
      <Route exact path={`${url}/training/-1`}>
        <RouteContainer maxWidth="md">
          <Breadcrumbs>
            <BreadcrumbsLink to={url}>Мой словарь</BreadcrumbsLink>
            <BreadcrumbsLink to={`${url}/training/-1`}>
              Тренировки
            </BreadcrumbsLink>
          </Breadcrumbs>
          <DictionaryTrainingTypes />
        </RouteContainer>
      </Route>
      <Route
        exact
        path={`${url}/training/:levelId/:trainingId`}
        render={({ match: { params } }) => (
          <RouteContainer maxWidth="lg">
            <Breadcrumbs>
              <BreadcrumbsLink to={url}>Мой словарь</BreadcrumbsLink>
              <BreadcrumbsLink to={`${url}/training/-1`}>
                Тренировки
              </BreadcrumbsLink>
              <BreadcrumbsLink
                to={`${url}/training/${params.levelId}/${params.trainingId}`}
              >
                Тренировка
              </BreadcrumbsLink>
            </Breadcrumbs>
            <MainTrainingSwitcher redirectionUrl="/dictionary" />
          </RouteContainer>
        )}
      />
    </Switch>
  );
}

export default DictionaryRouter;
