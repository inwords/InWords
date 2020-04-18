import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'src/reducers';
import apiMiddleware from 'src/middleware/apiMiddleware';

const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const configureStore = preloadedState =>
  createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(thunk, apiMiddleware))
  );

export default configureStore;
