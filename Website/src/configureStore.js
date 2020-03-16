import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from 'src/reducers';
import apiMiddleware from 'src/middleware/apiMiddleware';
import persistDataMiddleware from 'src/middleware/persistDataMiddleware';

const middleware = [apiMiddleware, persistDataMiddleware];

if (process.env.NODE_ENV === 'development') {
  const { logger } = require('redux-logger');
  middleware.unshift(logger);
}

export default function configureStore({ history, preloadedState }) {
  middleware.push(routerMiddleware(history));

  const store = createStore(
    createRootReducer(history),
    preloadedState,
    applyMiddleware(...middleware)
  );

  return store;
}
