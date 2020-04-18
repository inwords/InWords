import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { register } from './serviceWorker';
import { loadState } from 'src/localStorage';
import configureStore from './configureStore';
import App from './App';

import 'normalize.css';
import 'src/fonts/index.css';
import 'src/theme/theme.scss';

const preloadedState = loadState();
const store = configureStore(preloadedState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

register();
