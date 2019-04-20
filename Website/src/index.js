import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import store from './store/configureStore';
import theme from './theme';
import App from './components/App';

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <CssBaseline />
            <App />
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root')
);
