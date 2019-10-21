import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider } from 'emotion-theming';
import store from './store';
import theme from './theme';
import theme2 from './theme2';
import App from './App';

import 'normalize.css';
import 'src/theme/base.scss';

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme2}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.register();
