import { createStore, applyMiddleware } from 'redux';
import { loadState, saveState } from './localStorage';
import rootReducer from 'reducers';
import apiMiddleware from 'middleware/apiMiddleware';

const persistedState = loadState();

let middleware = [apiMiddleware];

if (process.env.NODE_ENV !== 'production') {
  const { logger } = require('redux-logger');
  middleware = [...middleware, logger];
}

const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(...middleware)
);

store.subscribe(() => {
  saveState({
    access: store.getState().access
  });
});

export default store;
