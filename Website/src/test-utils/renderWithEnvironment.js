import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import configureStore from 'src/configureStore';

const renderWithEnvironment = (
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
    initialState,
    store = configureStore(initialState)
  } = {}
) => ({
  ...render(
    <Provider store={store}>
      <Router history={history}>{ui}</Router>
    </Provider>
  ),
  store,
  history
});

export default renderWithEnvironment;
