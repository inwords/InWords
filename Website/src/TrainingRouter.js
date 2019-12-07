import React, { lazy } from 'react';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom';
import Container from 'src/components/Container';
import Breadcrumbs from 'src/components/Breadcrumbs';
import BreadcrumbsLink from 'src/components/BreadcrumbsLink';

const TrainingCategories = lazy(() => import('src/routes/TrainingCategories'));
const TrainingTypes = lazy(() => import('src/routes/TrainingTypes'));
const TrainingLevelCreator = lazy(() =>
  import('src/routes/TrainingLevelCreator')
);
const TrainingLevels = lazy(() => import('src/routes/TrainingLevels'));
const TrainingHistory = lazy(() => import('src/routes/TrainingHistory'));
const TrainingSwitcher = lazy(() => import('src/routes/TrainingSwitcher'));

function TrainingRouter() {
  const { url } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={url}>
        <Redirect to={`${url}/main`} />
      </Route>
      <Route exact path={`${url}/main`}>
        <Container maxWidth="lg">
          <TrainingLevelCreator />
          <Breadcrumbs>
            <BreadcrumbsLink to={`${url}/main`}>Тренировки</BreadcrumbsLink>
          </Breadcrumbs>
          <TrainingTypes endpoint="/0" />
        </Container>
      </Route>
      <Route
        exact
        path={`${url}/main/:trainingId/:levelId`}
        render={({ match: { params } }) => (
          <Container maxWidth="lg">
            <Breadcrumbs>
              <BreadcrumbsLink to={`${url}/main`}>Тренировки</BreadcrumbsLink>
              <BreadcrumbsLink
                to={`${url}/main/${params.trainingId}/${params.levelId}`}
              >
                Карточки
              </BreadcrumbsLink>
            </Breadcrumbs>
            <TrainingSwitcher trainingId={+params.trainingId} />
          </Container>
        )}
      ></Route>
      <Route exact path={`${url}/history`}>
        <Container maxWidth="lg">
          <Breadcrumbs>
            <BreadcrumbsLink to={`${url}/history`}>История</BreadcrumbsLink>
          </Breadcrumbs>
          <TrainingHistory />
        </Container>
      </Route>
      <Route
        exact
        path={`${url}/history/:levelId`}
        render={({ match: { params } }) => (
          <Container maxWidth="lg">
            <Breadcrumbs>
              <BreadcrumbsLink to={`${url}/history`}>История</BreadcrumbsLink>
              <BreadcrumbsLink to={`${url}/history/${params.levelId}`}>
                Тренировки
              </BreadcrumbsLink>
            </Breadcrumbs>
            <TrainingTypes />
          </Container>
        )}
      ></Route>
      <Route
        exact
        path={`${url}/history/:trainingId/:levelId`}
        render={({ match: { params } }) => (
          <Container maxWidth="lg">
            <Breadcrumbs>
              <BreadcrumbsLink to={`${url}/history`}>История</BreadcrumbsLink>
              <BreadcrumbsLink to={`${url}/history/${params.levelId}`}>
                Тренировки
              </BreadcrumbsLink>
              <BreadcrumbsLink
                to={`${url}/history/${params.levelId}/${params.trainingId}`}
              >
                Карточки
              </BreadcrumbsLink>
            </Breadcrumbs>
            <TrainingSwitcher trainingId={+params.trainingId} />
          </Container>
        )}
      ></Route>
      <Route exact path={`${url}/themes`}>
        <Container maxWidth="lg">
          <Breadcrumbs>
            <BreadcrumbsLink to={`${url}/themes`}>Темы</BreadcrumbsLink>
          </Breadcrumbs>
          <TrainingCategories />
        </Container>
      </Route>
      <Route
        exact
        path={`${url}/themes/:categoryId`}
        render={({ match: { params } }) => (
          <Container maxWidth="lg">
            <Breadcrumbs>
              <BreadcrumbsLink to={`${url}/themes`}>Темы</BreadcrumbsLink>
              <BreadcrumbsLink to={`${url}/themes/${params.categoryId}`}>
                Тренировки
              </BreadcrumbsLink>
            </Breadcrumbs>
            <TrainingTypes />
          </Container>
        )}
      ></Route>
      <Route
        exact
        path={`${url}/themes/:categoryId/:trainingId`}
        render={({ match: { params } }) => (
          <Container maxWidth="lg">
            <Breadcrumbs>
              <BreadcrumbsLink to={`${url}/themes`}>Темы</BreadcrumbsLink>
              <BreadcrumbsLink to={`${url}/themes/${params.categoryId}`}>
                Тренировки
              </BreadcrumbsLink>
              <BreadcrumbsLink
                to={`${url}/themes/${params.categoryId}/${params.trainingId}`}
              >
                Уровни
              </BreadcrumbsLink>
            </Breadcrumbs>
            <TrainingLevels />
          </Container>
        )}
      ></Route>
      <Route
        exact
        path={`${url}/themes/:categoryId/:trainingId/:levelId`}
        render={({ match: { params } }) => (
          <Container maxWidth="lg">
            <Breadcrumbs>
              <BreadcrumbsLink to={`${url}/themes`}>Темы</BreadcrumbsLink>
              <BreadcrumbsLink to={`${url}/themes/${params.categoryId}`}>
                Тренировки
              </BreadcrumbsLink>
              <BreadcrumbsLink
                to={`${url}/themes/${params.categoryId}/${params.trainingId}`}
              >
                Уровни
              </BreadcrumbsLink>
              <BreadcrumbsLink
                to={`${url}/themes/${params.categoryId}/${params.trainingId}/${params.levelId}`}
              >
                Карточки
              </BreadcrumbsLink>
            </Breadcrumbs>
            <TrainingSwitcher trainingId={+params.trainingId} />
          </Container>
        )}
      />
      <Route exact path={`${url}/dictionary`}>
        <Container maxWidth="md">
          <Breadcrumbs>
            <BreadcrumbsLink to={`${url}/dictionary`}>
              Тренировки
            </BreadcrumbsLink>
          </Breadcrumbs>
          <TrainingTypes endpoint="/-1" />
        </Container>
      </Route>
      <Route
        exact
        path={`${url}/dictionary/:trainingId/:levelId`}
        render={({ match: { params } }) => (
          <Container maxWidth="lg">
            <Breadcrumbs>
              <BreadcrumbsLink to={`${url}/dictionary`}>
                Тренировки
              </BreadcrumbsLink>
              <BreadcrumbsLink
                to={`${url}/dictionary/${params.levelId}/${params.trainingId}`}
              >
                Карточки
              </BreadcrumbsLink>
            </Breadcrumbs>
            <TrainingSwitcher trainingId={+params.trainingId} />
          </Container>
        )}
      ></Route>
    </Switch>
  );
}

export default TrainingRouter;
