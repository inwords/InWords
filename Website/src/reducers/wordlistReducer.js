import { wordlistConstants } from '../constants/wordlistConstants'

const initialState = {
    wordPairs: [],
    error: ''
};

export function wordlist(state = initialState, action) {
    switch (action.type) {
        case wordlistConstants.WORDPAIRS_REQUEST:
            return { ...state, error: '' };
        case wordlistConstants.WORDPAIRS_SUCCESS:
            return { ...state, wordPairs: action.payload };
        case wordlistConstants.WORDPAIRS_FAILURE:
            return { ...state, error: action.payload.message };
        default:
            return state;
    }
};
