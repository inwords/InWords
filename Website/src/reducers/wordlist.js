import { combineReducers } from 'redux';
import { wordlistConstants } from '../constants/wordlistConstants';

function wordPairs(state = [], action) {
    switch (action.type) {
        case wordlistConstants.PAIRS_PULL_LOCAL_REFRESH:
            return action.payload;
        case wordlistConstants.PAIRS_DEL_LOCAL_REFRESH:
            return state.filter(pair => pair.serverId !== action.pairId);
        default:
            return state;
    }
};

const initialState = {
    isFetching: false
};

function wordPairsPull(state = initialState, action) {
    switch (action.type) {
        case wordlistConstants.PAIRS_PULL_REQUEST:
            return { ...state, isFetching: true };
        case wordlistConstants.PAIRS_PULL_SUCCESS:
            return { ...state, isFetching: false };
        case wordlistConstants.PAIRS_PULL_FAILURE:
            return { ...state, isFetching: false };
        default:
            return state;
    }
};

function wordPairsDel(state = initialState, action) {
    switch (action.type) {
        case wordlistConstants.PAIRS_DEL_REQUEST:
            return { ...state, isFetching: true };
        case wordlistConstants.PAIRS_DEL_SUCCESS:
            return { ...state, isFetching: false };
        case wordlistConstants.PAIRS_DEL_FAILURE:
            return { ...state, isFetching: false };
        default:
            return state;
    }
};

export const wordlist = combineReducers({
    wordPairs: wordPairs,
    wordPairsPull: wordPairsPull,
    wordPairsDel: wordPairsDel
});
