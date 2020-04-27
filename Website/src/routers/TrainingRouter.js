import React, { lazy } from 'react';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom';
import RouteContainer from 'src/components/app-common/RouteContainer';
import Breadcrumbs from 'src/components/core/Breadcrumbs';
import BreadcrumbsLink from 'src/components/core/BreadcrumbsLink';

const MainTrainingTypes = lazy(() =>
  import(/* webpackPrefetch: true */ 'src/components/routes/MainTrainingTypes')
);
const TrainingHistory = lazy(() =>
  import(/* webpackPrefetch: true */ 'src/components/routes/TrainingHistory')
);
const MainTrainingSwitcher = lazy(() =>
  import(
    /* webpackPrefetch: true */ 'src/components/routes/MainTrainingSwitcher'
  )
);
const HistoryTrainingSwitcher = lazy(() =>
  import(
    /* webpackPrefetch: true */ 'src/components/routes/HistoryTrainingSwitcher'
  )
);
const WordSets = lazy(() =>
  import(/* webpackPrefetch: true */ 'src/components/routes/WordSets')
);
const WordSetPairs = lazy(() =>
  import(/* webpackPrefetch: true */ 'src/components/routes/WordSetPairs')
);
const WordSetLevels = lazy(() =>
  import(/* webpackPrefetch: true */ 'src/components/routes/WordSetLevels')
);
const WordSetTrainingSwitcher = lazy(() =>
  import(
    /* webpackPrefetch: true */ 'src/components/routes/WordSetTrainingSwitcher'
  )
);

function TrainingRouter() {
  const { url } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={url}>
        <Redirect to={`${url}/main/0`} />
      </Route>
      <Route exact path={`${url}/main/0`}>
        <RouteContainer maxWidth="lg">
          <MainTrainingTypes />
        </RouteContainer>
      </Route>
      <Route
        exact
        path={`${url}/main/:levelId/:trainingId`}
        render={({ match: { params } }) => (
          <RouteContainer maxWidth="lg">
            <Breadcrumbs>
              <BreadcrumbsLink to={`${url}/main/0`}>Тренировки</BreadcrumbsLink>
              <BreadcrumbsLink
                to={`${url}/main/${params.levelId}/${params.trainingId}`}
              >
                Тренировка
              </BreadcrumbsLink>
            </Breadcrumbs>
            <MainTrainingSwitcher redirectionUrl="/training/main/0" />
          </RouteContainer>
        )}
      />
      <Route exact path={`${url}/history`}>
        <RouteContainer maxWidth="lg">
          <TrainingHistory />
        </RouteContainer>
      </Route>
      <Route
        exact
        path={`${url}/history/:levelId/:trainingId`}
        render={({ match: { params } }) => (
          <RouteContainer maxWidth="lg">
            <Breadcrumbs>
              <BreadcrumbsLink to={`${url}/history`}>История</BreadcrumbsLink>
              <BreadcrumbsLink
                to={`${url}/history/${params.levelId}/${params.trainingId}`}
              >
                Тренировка
              </BreadcrumbsLink>
            </Breadcrumbs>
            <HistoryTrainingSwitcher />
          </RouteContainer>
        )}
      />
      <Route exact path={`${url}/courses`}>
        <RouteContainer maxWidth="lg">
          <WordSets />
        </RouteContainer>
      </Route>
      <Route
        exact
        path={`${url}/courses/:wordSetId/word-pairs`}
        render={({ match: { params } }) => (
          <RouteContainer maxWidth="md">
            <Breadcrumbs>
              <BreadcrumbsLink to={`${url}/courses`}>Курсы</BreadcrumbsLink>
              <BreadcrumbsLink
                to={`${url}/courses/${params.wordSetId}/word-pairs`}
              >
                Набор слов
              </BreadcrumbsLink>
            </Breadcrumbs>
            <WordSetPairs />
          </RouteContainer>
        )}
      />
      <Route
        exact
        path={`${url}/courses/:wordSetId`}
        render={({ match: { params } }) => (
          <RouteContainer maxWidth="lg">
            <Breadcrumbs>
              <BreadcrumbsLink to={`${url}/courses`}>Курсы</BreadcrumbsLink>
              <BreadcrumbsLink to={`${url}/courses/${params.wordSetId}`}>
                Уровни
              </BreadcrumbsLink>
            </Breadcrumbs>
            <WordSetLevels />
          </RouteContainer>
        )}
      />
      <Route
        exact
        path={`${url}/courses/:wordSetId/:levelId/:trainingId`}
        render={({ match: { params } }) => (
          <RouteContainer maxWidth="lg">
            <Breadcrumbs>
              <BreadcrumbsLink to={`${url}/courses`}>Курсы</BreadcrumbsLink>
              <BreadcrumbsLink to={`${url}/courses/${params.wordSetId}`}>
                Уровни
              </BreadcrumbsLink>
              <BreadcrumbsLink
                to={`${url}/courses/${params.wordSetId}/${params.levelId}/${params.trainingId}`}
              >
                Тренировка
              </BreadcrumbsLink>
            </Breadcrumbs>
            <WordSetTrainingSwitcher />
          </RouteContainer>
        )}
      />
    </Switch>
  );
}

export default TrainingRouter;
