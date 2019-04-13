

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import deepPurple from '@material-ui/core/colors/deepPurple';
import amber from '@material-ui/core/colors/amber';
import pink from '@material-ui/core/colors/pink';
import store from './store/configureStore';
import App from './components/App';

const theme = createMuiTheme({
    palette: {
        primary: deepPurple,
        secondary: amber,
        error: pink,
    },
    typography: {
        useNextVariants: true,
    },
});

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <CssBaseline />
            <App />
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root')
);
