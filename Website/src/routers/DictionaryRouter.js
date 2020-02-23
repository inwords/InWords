import React, { lazy } from 'react';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom';
import Container from 'src/components/core/Container';
import Breadcrumbs from 'src/components/core/Breadcrumbs';
import BreadcrumbsLink from 'src/components/core/BreadcrumbsLink';

const Dictionary = lazy(() => import('src/components/routes/Dictionary'));
const DictionaryTrainingTypes = lazy(() =>
  import('src/components/routes/DictionaryTrainingTypes')
);
const DictionaryTrainingSwitcher = lazy(() =>
  import('src/components/routes/DictionaryTrainingSwitcher')
);
const WordSets = lazy(() => import('src/components/routes/WordSets'));
const TrainingLevels = lazy(() =>
  import('src/components/routes/TrainingLevels')
);
const WordSetsTrainingTypes = lazy(() =>
  import('src/components/routes/WordSetsTrainingTypes')
);
const WordSetsTrainingSwitcher = lazy(() =>
  import('src/components/routes/WordSetsTrainingSwitcher')
);

function DictionaryRouter() {
  const { url } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={url}>
        <Redirect to={`${url}/my`} />
      </Route>
      <Route path={`${url}/my`}>
        <Container maxWidth="md">
          <Dictionary />
        </Container>
      </Route>
      <Route exact path={`${url}/training/-1`}>
        <Container maxWidth="md">
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
            <DictionaryTrainingSwitcher trainingId={+params.trainingId} />
          </Container>
        )}
      ></Route>
      <Route exact path={`${url}/sets`}>
        <Container maxWidth="lg">
          <WordSets />
        </Container>
      </Route>
      <Route
        exact
        path={`${url}/sets/training/:categoryId`}
        render={({ match: { params } }) => (
          <Container maxWidth="lg">
            <Breadcrumbs>
              <BreadcrumbsLink to={`${url}/sets`}>Наборы слов</BreadcrumbsLink>
              <BreadcrumbsLink to={`${url}/sets/training/${params.categoryId}`}>
                Уровни
              </BreadcrumbsLink>
            </Breadcrumbs>
            <TrainingLevels />
          </Container>
        )}
      />
      <Route
        exact
        path={`${url}/sets/training/:categoryId/:levelId`}
        render={({ match: { params } }) => (
          <Container maxWidth="lg">
            <Breadcrumbs>
              <BreadcrumbsLink to={`${url}/sets`}>Наборы слов</BreadcrumbsLink>
              <BreadcrumbsLink to={`${url}/sets/training/${params.categoryId}`}>
                Уровни
              </BreadcrumbsLink>
              <BreadcrumbsLink
                to={`${url}/sets/training/${params.categoryId}/${params.levelId}`}
              >
                Тренировки
              </BreadcrumbsLink>
            </Breadcrumbs>
            <WordSetsTrainingTypes />
          </Container>
        )}
      />
      <Route
        exact
        path={`${url}/sets/training/:categoryId/:levelId/:trainingId`}
        render={({ match: { params } }) => (
          <Container maxWidth="lg">
            <Breadcrumbs>
              <BreadcrumbsLink to={`${url}/sets`}>Наборы слов</BreadcrumbsLink>
              <BreadcrumbsLink to={`${url}/sets/training/${params.categoryId}`}>
                Уровни
              </BreadcrumbsLink>
              <BreadcrumbsLink
                to={`${url}/sets/training/${params.categoryId}/${params.levelId}`}
              >
                Тренировки
              </BreadcrumbsLink>
              <BreadcrumbsLink
                to={`${url}/sets/training/${params.categoryId}/${params.levelId}/${params.trainingId}`}
              >
                Тренировка
              </BreadcrumbsLink>
            </Breadcrumbs>
            <WordSetsTrainingSwitcher trainingId={+params.trainingId} />
          </Container>
        )}
      />
    </Switch>
  );
}

export default DictionaryRouter;
