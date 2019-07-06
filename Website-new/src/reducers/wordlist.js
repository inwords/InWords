import wordlistConstants from '../constants/wordlistConstants';

const initialState = {
    isActual: false,
    wordPairs: []
};

const wordlist = (state = initialState, action) => {
    switch (action.type) {
        case wordlistConstants.INITIALIZE_WORD_PAIRS:
            return {
                isActual: true,
                wordPairs: action.payload.addedWords || []
            };
        case wordlistConstants.UPDATE_WORD_PAIRS_AFTER_DELETION:
            return {
                ...state,
                wordPairs: state.wordPairs.filter(wordPair => !action.payload.includes(wordPair.serverId))
            };
        case wordlistConstants.UPDATE_WORD_PAIRS_AFTER_ADDITION:
            if (state.wordPairs.find(wordPair => wordPair.serverId === action.payload.serverId)) {
                return state;
            }
            return {
                ...state,
                wordPairs: state.wordPairs.concat(action.payload)
            };
        case wordlistConstants.UPDATE_WORD_PAIRS_AFTER_EDITING:
            if (state.wordPairs.find(wordPair => wordPair.serverId === action.payload.wordPair.serverId)) {
                return {
                    ...state,
                    wordPairs: state.wordPairs.filter(wordPair => wordPair.serverId !== action.payload.pairId)
                };
            }
            return {
                ...state,
                wordPairs: state.wordPairs.map(wordPair => {
                    return wordPair.serverId === action.payload.pairId ?
                        action.payload.wordPair :
                        wordPair;
                })
            };
        default:
            return state;
    }
};

export default wordlist;
