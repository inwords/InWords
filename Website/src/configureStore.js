import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'src/reducers';
import apiMiddleware from 'src/middleware/apiMiddleware';
import persistDataMiddleware from 'src/middleware/persistDataMiddleware';

const middleware = [thunk];

middleware.push(apiMiddleware, persistDataMiddleware);

const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const configureStore = preloadedState =>
  createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(...middleware))
  );

export default configureStore;
