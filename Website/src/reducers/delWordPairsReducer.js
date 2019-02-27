import { wordlistConstants } from '../constants/wordlistConstants'

const initialState = {
    error: ''
};

export function delWordPairs(state = initialState, action) {
    switch (action.type) {
        case wordlistConstants.DEL_PAIRS_REQUEST:
            return { ...state, error: '' };
        case wordlistConstants.DEL_PAIRS_SUCCESS:
            return state;
        case wordlistConstants.DEL_PAIRS_FAILURE:
            return { ...state, error: action.payload.message };
        default:
            return state;
    }
};
