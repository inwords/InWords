import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider } from 'emotion-theming';
import CssBaseline from '@material-ui/core/CssBaseline';
import store from './store';
import theme from './theme';
import App from './App';

import './theme/theme.scss';
import './fonts/index.css';

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.register();
