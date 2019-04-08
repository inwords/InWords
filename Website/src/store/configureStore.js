import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { loadState, saveState } from './localStorage';
import rootReducer from '../reducers';
import apiMiddleware from '../middleware/apiMiddleware';

const persistedState = loadState();

const store = createStore(
    rootReducer,
    persistedState,
    applyMiddleware(
        thunk,
        logger,
        apiMiddleware
    )
);

store.subscribe(() => {
    saveState({
        access: store.getState().access
    });
});

export default store;
