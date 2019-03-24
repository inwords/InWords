import { combineReducers } from 'redux';
import { wordlistConstants } from '../constants/wordlistConstants';

const wordPairs = (state = [], action) => {
    switch (action.type) {
        case wordlistConstants.PAIRS_PULL_LOCAL_REFRESH:
            return action.wordPairs;
        case wordlistConstants.PAIRS_DEL_LOCAL_REFRESH:
            return state.filter((pair) => pair.serverId !== action.pairId);
        case wordlistConstants.PAIRS_ADD_LOCAL_REFRESH:
            if (state.find((wordPair) => wordPair.serverId === action.wordPair.serverId)) {
                return state;
            }
            return state.concat(action.wordPair);
        case wordlistConstants.PAIRS_EDIT_LOCAL_REFRESH:
            if (state.find((wordPair) => wordPair.serverId === action.wordPair.serverId)) {
                return state;
            }
            return state.map((wordPair) => {
                return wordPair.serverId !== action.pairId ?
                    wordPair :
                    action.wordPair
            });
        default:
            return state;
    }
};

const searchPattern = (state = '', action) => {
    if (action.type === wordlistConstants.PAIRS_SEARCH_PATTERN_CHANGE) {
        return action.pattern;
    }
    return state;
};

export const wordlist = combineReducers({
    wordPairs,
    searchPattern
});
