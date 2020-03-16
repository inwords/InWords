import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { register } from './serviceWorker';
import { loadState } from 'src/localStorage';
import configureStore from './configureStore';
import App from './App';

import 'normalize.css';

import 'src/fonts/index.css';
import 'src/theme/theme.scss';

const history = createBrowserHistory();
const preloadedState = loadState();
const store = configureStore({ history, preloadedState });

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

register();
