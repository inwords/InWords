import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from '../reducers';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { loadState, saveState } from './localStorage'

const persistedState = loadState();
export const store = createStore(rootReducer, persistedState, applyMiddleware(thunk, logger));

store.subscribe(() => {
    saveState({
        accessToken: store.getState().accessToken
    });
});
