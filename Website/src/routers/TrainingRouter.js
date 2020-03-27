import React, { lazy } from 'react';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom';
import Container from 'src/components/core/Container';
import Breadcrumbs from 'src/components/core/Breadcrumbs';
import BreadcrumbsLink from 'src/components/core/BreadcrumbsLink';

const MainTrainingTypes = lazy(() =>
  import('src/components/routes/MainTrainingTypes')
);
const TrainingHistory = lazy(() =>
  import('src/components/routes/TrainingHistory')
);
const MainTrainingSwitcher = lazy(() =>
  import('src/components/routes/MainTrainingSwitcher')
);
const HistoryTrainingSwitcher = lazy(() =>
  import('src/components/routes/HistoryTrainingSwitcher')
);
const WordSets = lazy(() => import('src/components/routes/WordSets'));
const WordSet = lazy(() => import('src/components/routes/WordSet'));
const Course = lazy(() => import('src/components/routes/Course'));
const CoursesTrainingSwitcher = lazy(() =>
  import('src/components/routes/CoursesTrainingSwitcher')
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
          <MainTrainingTypes />
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
            <MainTrainingSwitcher />
          </Container>
        )}
      />
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
            <HistoryTrainingSwitcher />
          </Container>
        )}
      />
      <Route exact path={`${url}/courses`}>
        <Container maxWidth="lg">
          <WordSets />
        </Container>
      </Route>
      <Route
        exact
        path={`${url}/courses/:wordSetId/word-pairs`}
        render={({ match: { params } }) => (
          <Container maxWidth="md">
            <Breadcrumbs>
              <BreadcrumbsLink to={`${url}/courses`}>Курсы</BreadcrumbsLink>
              <BreadcrumbsLink
                to={`${url}/courses/${params.wordSetId}/word-pairs`}
              >
                Набор слов
              </BreadcrumbsLink>
            </Breadcrumbs>
            <WordSet />
          </Container>
        )}
      />
      <Route
        exact
        path={`${url}/courses/:wordSetId`}
        render={({ match: { params } }) => (
          <Container maxWidth="lg">
            <Breadcrumbs>
              <BreadcrumbsLink to={`${url}/courses`}>Курсы</BreadcrumbsLink>
              <BreadcrumbsLink to={`${url}/courses/${params.wordSetId}`}>
                Уровни
              </BreadcrumbsLink>
            </Breadcrumbs>
            <Course />
          </Container>
        )}
      />
      <Route
        exact
        path={`${url}/courses/:wordSetId/:levelId/:trainingId`}
        render={({ match: { params } }) => (
          <Container maxWidth="lg">
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
            <CoursesTrainingSwitcher />
          </Container>
        )}
      />
    </Switch>
  );
}

export default TrainingRouter;
