import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'src/reducers';
import apiMiddleware from 'src/middleware/apiMiddleware';
import persistDataMiddleware from 'src/middleware/persistDataMiddleware';

const middleware = [thunk];

if (process.env.NODE_ENV === 'development') {
  const { logger } = require('redux-logger');
  middleware.push(logger);
}

middleware.push(apiMiddleware, persistDataMiddleware);

const configureStore = preloadedState =>
  createStore(rootReducer, preloadedState, applyMiddleware(...middleware));

export default configureStore;
