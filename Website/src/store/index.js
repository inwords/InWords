import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { loadState, saveState } from './localStorage';
import rootReducer from 'reducers';
import apiMiddleware from 'middleware/apiMiddleware';

const persistedState = loadState();

const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(logger, apiMiddleware)
);

store.subscribe(() => {
  saveState({
    access: store.getState().access,
  });
});

export default store;
