import React from 'react';
import ReactDOM from 'react-dom';
import { register } from './serviceWorker';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import store from './store';
import App from './App';

import './theme/theme.scss';
import './fonts/index.css';

ReactDOM.render(
  <Provider store={store}>
    <CssBaseline />
    <App />
  </Provider>,
  document.getElementById('root')
);

register();
