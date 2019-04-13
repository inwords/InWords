import wordPairsConstants from '../constants/wordPairsConstants';

const wordPairs = (state = [], action) => {
    switch (action.type) {
        case wordPairsConstants.WORD_PAIRS_INITIALIZATION:
            return action.payload.addedWords || [];
        case wordPairsConstants.WORD_PAIRS_UPDATE_AFTER_DELETION:
            return state.filter(pair => !action.payload.includes(pair.serverId));
        case wordPairsConstants.WORD_PAIRS_UPDATE_AFTER_ADDITION:
            if (state.find(wordPair => wordPair.serverId === action.payload.serverId)) {
                return state;
            }
            return state.concat(action.payload);
        case wordPairsConstants.WORD_PAIRS_UPDATE_AFTER_EDITING:
            if (state.find(wordPair => wordPair.serverId === action.payload.wordPair.serverId)) {
                return state;
            }
            return state.map(wordPair => {
                return wordPair.serverId !== action.payload.pairId ?
                    wordPair :
                    action.payload.wordPair
            });
        default:
            return state;
    }
};

export default wordPairs;
