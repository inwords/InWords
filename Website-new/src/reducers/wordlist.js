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
                wordPairs: state.wordPairs.filter(pair => !action.payload.includes(pair.serverId))
            };
        case wordlistConstants.UPDATE_WORD_PAIRS_AFTER_ADDITION:
            return {
                ...state,
                wordPairs: state.wordPairs.concat(
                    action.payload.reduce(pair => !state.wordPairs.includes(pair.serverId))
                )
            };
        /*case wordlistConstants.UPDATE_WORD_PAIRS_AFTER_EDITING:
            if (state.find(wordPair => wordPair.serverId === action.payload.wordPair.serverId)) {
                return state;
            }
            return state.map(wordPair => {
                return wordPair.serverId !== action.payload.pairId ?
                    wordPair :
                    action.payload.wordPair
            });*/
        default:
            return state;
    }
};

export default wordlist;
