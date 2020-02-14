import React, { lazy } from 'react';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom';
import Container from 'src/components/Container';

const Dictionary = lazy(() => import('src/routes/Dictionary'));
const WordSets = lazy(() => import('src/routes/WordSets'));

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
      <Route exact path={`${url}/sets`}>
        <Container maxWidth="lg">
          <WordSets />
        </Container>
      </Route>
    </Switch>
  );
}

export default DictionaryRouter;