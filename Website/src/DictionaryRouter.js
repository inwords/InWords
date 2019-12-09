import React, { lazy } from 'react';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom';
import Container from 'src/components/Container';

const DictionaryMain = lazy(() => import('src/routes/DictionaryMain'));
const Dictionary = lazy(() => import('src/routes/Dictionary'));
const TrainingCategories = lazy(() => import('src/routes/TrainingCategories'));

function DictionaryRouter() {
  const { url } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={url}>
        <Redirect to={`${url}/main`} />
      </Route>
      <Route path={`${url}/main`}>
        <Container maxWidth="md">
          <DictionaryMain />
        </Container>
      </Route>
      <Route path={`${url}/my`}>
        <Container maxWidth="md">
          <Dictionary />
        </Container>
      </Route>
      <Route exact path={`${url}/sets`}>
        <Container maxWidth="lg">
          <TrainingCategories />
        </Container>
      </Route>
    </Switch>
  );
}

export default DictionaryRouter;
