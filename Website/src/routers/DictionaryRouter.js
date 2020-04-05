import React, { lazy } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Container from 'src/components/core/Container';
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
        <Container maxWidth="md">
          <Dictionary />
        </Container>
      </Route>
      <Route exact path={`${url}/training/-1`}>
        <Container maxWidth="lg">
          <Breadcrumbs>
            <BreadcrumbsLink to={url}>Мой словарь</BreadcrumbsLink>
            <BreadcrumbsLink to={`${url}/training/-1`}>
              Тренировки
            </BreadcrumbsLink>
          </Breadcrumbs>
          <DictionaryTrainingTypes />
        </Container>
      </Route>
      <Route
        exact
        path={`${url}/training/:levelId/:trainingId`}
        render={({ match: { params } }) => (
          <Container maxWidth="lg">
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
          </Container>
        )}
      />
    </Switch>
  );
}

export default DictionaryRouter;
