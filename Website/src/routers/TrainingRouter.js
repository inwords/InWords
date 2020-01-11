import React, { lazy } from 'react';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom';
import Container from 'src/components/Container';
import Breadcrumbs from 'src/components/Breadcrumbs';
import BreadcrumbsLink from 'src/components/BreadcrumbsLink';

const TrainingTypes = lazy(() => import('src/routes/TrainingTypes'));
const TrainingHistory = lazy(() => import('src/routes/TrainingHistory'));
const TrainingSwitcher = lazy(() => import('src/routes/TrainingSwitcher'));

const trainingTypesInfo = [
  {
    typeId: 0,
    title: 'Закрытые карточки',
    description: 'Необходимо правильно открыть пару карточек «Слово-Перевод»'
  }
];

function TrainingRouter() {
  const { url } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={url}>
        <Redirect to={`${url}/main`} />
      </Route>
      <Route exact path={`${url}/main`}>
        <Container maxWidth="lg">
          <Breadcrumbs>
            <BreadcrumbsLink to={`${url}/main`}>Тренировки</BreadcrumbsLink>
          </Breadcrumbs>
          <TrainingTypes trainingTypesInfo={trainingTypesInfo} />
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
                Тренировка
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
            <TrainingSwitcher trainingId={+params.trainingId} />
          </Container>
        )}
      ></Route>
      <Route exact path={`${url}/dictionary`}>
        <Container maxWidth="md">
          <Breadcrumbs>
            <BreadcrumbsLink to={`${url}/dictionary`}>
              Тренировки
            </BreadcrumbsLink>
          </Breadcrumbs>
          <TrainingTypes trainingTypesInfo={trainingTypesInfo} level={-1} />
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
                Тренировка
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
