import * as wordPairsConstants from 'constants/wordPairsConstants';

export const initializeWordPairs = data => ({
  type: wordPairsConstants.INITIALIZE_WORD_PAIRS,
  payload: data,
});

export const updateWordPairsAfterDeletion = pairIds => ({
  type: wordPairsConstants.UPDATE_WORD_PAIRS_AFTER_DELETION,
  payload: pairIds,
});

export const updateWordPairsAfterAddition = wordPair => ({
  type: wordPairsConstants.UPDATE_WORD_PAIRS_AFTER_ADDITION,
  payload: wordPair,
});

export const updateWordPairsAfterEditing = (pairId, wordPair) => ({
  type: wordPairsConstants.UPDATE_WORD_PAIRS_AFTER_EDITING,
  payload: {
    pairId: pairId,
    wordPair: wordPair,
  },
});
