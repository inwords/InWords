import wordPairsConstants from '../constants/wordPairsConstants';

const initializeWordPairs = data => ({
    type: wordPairsConstants.INITIALIZE_WORD_PAIRS,
    payload: data
});

const updateWordPairsAfterDeletion = pairIds => ({
    type: wordPairsConstants.UPDATE_WORD_PAIRS_AFTER_DELETION,
    payload: pairIds
});

const updateWordPairsAfterAddition = wordPair => ({
    type: wordPairsConstants.UPDATE_WORD_PAIRS_AFTER_ADDITION,
    payload: wordPair
});

const updateWordPairsAfterEditing = (pairId, wordPair) => ({
    type: wordPairsConstants.UPDATE_WORD_PAIRS_AFTER_EDITING,
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
