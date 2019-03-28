import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import deepPurple from '@material-ui/core/colors/deepPurple';
import amber from '@material-ui/core/colors/amber';
import pink from '@material-ui/core/colors/pink';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { store } from './store/configureStore';
import App from './containers/App';

import 'typeface-roboto';

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
            <App />
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root')
);
