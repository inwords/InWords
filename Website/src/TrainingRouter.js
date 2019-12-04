import React, { lazy } from 'react';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom';
import Container from 'src/components/Container';
import Breadcrumbs from 'src/components/Breadcrumbs';
import BreadcrumbsLink from 'src/components/BreadcrumbsLink';

const TrainingCategories = lazy(() => import('./routes/TrainingCategories'));
const TrainingTypes = lazy(() => import('./routes/TrainingTypes'));
const MainTrainingTypes = lazy(() => import('./routes/MainTrainingTypes'));
const TrainingLevels = lazy(() => import('./routes/TrainingLevels'));
const TrainingHistory = lazy(() => import('./routes/TrainingHistory'));
const Game = lazy(() => import('./routes/Game'));

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
          <MainTrainingTypes />
        </Container>
      </Route>
      <Route
        exact
        path={`${url}/main/:trainingId/:levelId`}
        render={({ match, ...rest }) => {
          switch (match.params.trainingId) {
            case '0':
              return (
                <Container maxWidth="lg">
                  <Breadcrumbs>
                    <BreadcrumbsLink to={`${url}/main`}>
                      Тренировки
                    </BreadcrumbsLink>
                    <BreadcrumbsLink
                      to={`${url}/main/${match.params.trainingId}/${match.params.levelId}`}
                    >
                      Карточки
                    </BreadcrumbsLink>
                  </Breadcrumbs>
                  <Game match={match} {...rest} />
                </Container>
              );
            case '1':
              return null;
            default:
              return null;
          }
        }}
      ></Route>
      <Route exact path={`${url}/history`}>
        <Container maxWidth="lg">
          <TrainingHistory />
        </Container>
      </Route>
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
        render={({ match, ...rest }) => (
          <Container maxWidth="lg">
            <Breadcrumbs>
              <BreadcrumbsLink to={`${url}/themes`}>Темы</BreadcrumbsLink>
              <BreadcrumbsLink to={`${url}/themes/${match.params.categoryId}`}>
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
        render={({ match, ...rest }) => (
          <Container maxWidth="lg">
            <Breadcrumbs>
              <BreadcrumbsLink to={`${url}/themes`}>Темы</BreadcrumbsLink>
              <BreadcrumbsLink to={`${url}/themes/${match.params.categoryId}`}>
                Тренировки
              </BreadcrumbsLink>
              <BreadcrumbsLink
                to={`${url}/themes/${match.params.categoryId}/${match.params.trainingId}`}
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
        render={({ match, ...rest }) => {
          switch (match.params.trainingId) {
            case '0':
              return (
                <Container maxWidth="lg">
                  <Breadcrumbs>
                    <BreadcrumbsLink to={`${url}/themes`}>Темы</BreadcrumbsLink>
                    <BreadcrumbsLink
                      to={`${url}/themes/${match.params.categoryId}`}
                    >
                      Тренировки
                    </BreadcrumbsLink>
                    <BreadcrumbsLink
                      to={`${url}/themes/${match.params.categoryId}/${match.params.trainingId}`}
                    >
                      Уровни
                    </BreadcrumbsLink>
                    <BreadcrumbsLink
                      to={`${url}/themes/${match.params.categoryId}/${match.params.trainingId}/${match.params.levelId}`}
                    >
                      Карточки
                    </BreadcrumbsLink>
                  </Breadcrumbs>
                  <Game match={match} {...rest} />
                </Container>
              );
            case '1':
              return null;
            default:
              return null;
          }
        }}
      />
    </Switch>
  );
}

export default TrainingRouter;
