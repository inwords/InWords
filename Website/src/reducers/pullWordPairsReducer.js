import { wordlistConstants } from '../constants/wordlistConstants'

const initialState = {
    pairs: [],
    error: ''
};

export function pullWordPairs(state = initialState, action) {
    switch (action.type) {
        case wordlistConstants.PULL_PAIRS_REQUEST:
            return { ...state, error: '' };
        case wordlistConstants.PULL_PAIRS_SUCCESS:
            return { ...state, pairs: action.payload };
        case wordlistConstants.PULL_PAIRS_FAILURE:
            return { ...state, error: action.payload.message };
        default:
            return state;
    }
};
