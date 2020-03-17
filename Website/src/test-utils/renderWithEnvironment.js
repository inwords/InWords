import React from 'react';
import { createMemoryHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import configureStore from 'src/configureStore';

const renderWithEnvironment = (
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
    initialState,
    store = configureStore({ preloadedState: initialState, history })
  } = {}
) => ({
  ...render(
    <Provider store={store}>
      <ConnectedRouter history={history}>{ui}</ConnectedRouter>
    </Provider>
  ),
  store,
  history
});

export default renderWithEnvironment;
