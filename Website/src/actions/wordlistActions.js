import wordlistConstants from '../constants/wordlistConstants';

const initializeWordPairs = data => ({
    type: wordlistConstants.WORD_PAIRS_INITIALIZATION,
    payload: data
});

const updateWordPairsAfterDeletion = pairIds => ({
    type: wordlistConstants.WORD_PAIRS_UPDATE_AFTER_DELETION,
    payload: pairIds
});

const updateWordPairsAfterAddition = wordPair => ({
    type: wordlistConstants.WORD_PAIRS_UPDATE_AFTER_ADDITION,
    payload: wordPair
});

const updateWordPairsAfterEditing = (pairId, wordPair) => ({
    type: wordlistConstants.WORD_PAIRS_UPDATE_AFTER_EDITING,
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
