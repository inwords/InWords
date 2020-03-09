import React from 'react';
import { createMemoryHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import configureStore from 'src/configureStore';

export default function renderWithEnvironment(
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] })
  } = {}
) {
  const store = configureStore({ history });

  return {
    ...render(
      <Provider store={store}>
        <ConnectedRouter history={history}>{ui}</ConnectedRouter>
      </Provider>
    ),
    store,
    history
  };
}
