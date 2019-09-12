import { createStore, applyMiddleware } from 'redux';
import { loadState } from 'localStorage';
import rootReducer from 'reducers';
import apiMiddleware from 'middleware/apiMiddleware';
import persistDataMiddleware from 'middleware/persistDataMiddleware';

const persistedState = loadState();

let middleware = [apiMiddleware, persistDataMiddleware];

if (process.env.NODE_ENV !== 'production') {
  const { logger } = require('redux-logger');
  middleware = [...middleware, logger];
}

const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(...middleware)
);

export default store;
