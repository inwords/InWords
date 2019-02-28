import { wordlistConstants } from '../constants/wordlistConstants'

const initialState = {
    relevant: false
};

export function wordPairsRelevance(state = initialState, action) {
    switch (action.type) {
        case wordlistConstants.PAIRS_RELEVANT:
            return { ...state, relevant: true };
        case wordlistConstants.PAIRS_IRRELEVANT:
            return { ...state, relevant: false };
        default:
            return state;
    }
};
