import React from 'react';
import ReactDOM from 'react-dom';
import { register } from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

import 'normalize.css';

import 'src/fonts/index.css';
import 'src/theme/theme.scss';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

register();
