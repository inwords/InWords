import { combineReducers } from 'redux';
import { wordlistConstants } from '../constants/wordlistConstants';

const wordPairs = (state = [], action) => {
    switch (action.type) {
        case wordlistConstants.PAIRS_PULL_LOCAL_REFRESH:
            return action.payload.addedWords;
        case wordlistConstants.PAIRS_DEL_LOCAL_REFRESH:
            return state.filter((pair) => !~action.payload.indexOf(pair.serverId));
        case wordlistConstants.PAIRS_ADD_LOCAL_REFRESH:
            if (state.find((wordPair) => wordPair.serverId === action.payload.serverId)) {
                return state;
            }
            return state.concat(action.payload);
        case wordlistConstants.PAIRS_EDIT_LOCAL_REFRESH:
            if (state.find((wordPair) => wordPair.serverId === action.payload.wordPair.serverId)) {
                return state;
            }
            return state.map((wordPair) => {
                return wordPair.serverId !== action.payload.pairId ?
                    wordPair :
                    action.payload.wordPair
            });
        default:
            return state;
    }
};

export const wordlist = combineReducers({
    wordPairs
});
