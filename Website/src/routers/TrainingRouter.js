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
const Courses = lazy(() => import('src/components/routes/Courses'));
const TrainingLevels = lazy(() =>
  import('src/components/routes/TrainingLevels')
);
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
            <MainTrainingSwitcher trainingId={+params.trainingId} />
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
              <BreadcrumbsLink to={`${url}/history`}>
                Недавние тренировки
              </BreadcrumbsLink>
              <BreadcrumbsLink
                to={`${url}/history/${params.levelId}/${params.trainingId}`}
              >
                Тренировка
              </BreadcrumbsLink>
            </Breadcrumbs>
            <HistoryTrainingSwitcher trainingId={+params.trainingId} />
          </Container>
        )}
      />
      <Route exact path={`${url}/courses`}>
        <Container maxWidth="lg">
          <Courses />
        </Container>
      </Route>
      <Route
        exact
        path={`${url}/courses/:categoryId`}
        render={({ match: { params } }) => (
          <Container maxWidth="lg">
            <Breadcrumbs>
              <BreadcrumbsLink to={`${url}/courses`}>Курсы</BreadcrumbsLink>
              <BreadcrumbsLink to={`${url}/courses/${params.categoryId}`}>
                Уровни
              </BreadcrumbsLink>
            </Breadcrumbs>
            <TrainingLevels />
          </Container>
        )}
      />
      <Route
        exact
        path={`${url}/courses/:categoryId/:levelId/:trainingId`}
        render={({ match: { params } }) => (
          <Container maxWidth="lg">
            <Breadcrumbs>
              <BreadcrumbsLink to={`${url}/courses`}>Курсы</BreadcrumbsLink>
              <BreadcrumbsLink to={`${url}/courses/${params.categoryId}`}>
                Уровни
              </BreadcrumbsLink>
              <BreadcrumbsLink
                to={`${url}/courses/${params.categoryId}/${params.levelId}/${params.trainingId}`}
              >
                Тренировка
              </BreadcrumbsLink>
            </Breadcrumbs>
            <CoursesTrainingSwitcher trainingId={+params.trainingId} />
          </Container>
        )}
      />
    </Switch>
  );
}

export default TrainingRouter;
