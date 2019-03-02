import './styles/custom_bootstrap.scss';
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { store } from './store/configureStore';
import App from './containers/App';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
