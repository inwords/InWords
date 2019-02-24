import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { store } from './store/configureStore';
import App from './containers/App';

import * as serviceWorker from './serviceWorker';

import './index.css';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
