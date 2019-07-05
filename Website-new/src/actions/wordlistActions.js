import wordlistConstants from '../constants/wordlistConstants';

const initializeWordPairs = data => ({
    type: wordlistConstants.INITIALIZE_WORD_PAIRS,
    payload: data
});

const updateWordPairsAfterDeletion = pairIds => ({
    type: wordlistConstants.UPDATE_WORD_PAIRS_AFTER_DELETION,
    payload: pairIds
});

const updateWordPairsAfterAddition = wordPair => ({
    type: wordlistConstants.UPDATE_WORD_PAIRS_AFTER_ADDITION,
    payload: wordPair
});

const updateWordPairsAfterEditing = (pairId, wordPair) => ({
    type: wordlistConstants.UPDATE_WORD_PAIRS_AFTER_EDITING,
    payload: {
        pairId: pairId,
        wordPair: wordPair
    }
});

export default {
    initializeWordPairs,
    updateWordPairsAfterDeletion,
    updateWordPairsAfterAddition,
    updateWordPairsAfterEditing
};
