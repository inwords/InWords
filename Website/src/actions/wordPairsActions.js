export const INITIALIZE_WORD_PAIRS = 'INITIALIZE_WORD_PAIRS';
export const initializeWordPairs = data => ({
  type: INITIALIZE_WORD_PAIRS,
  payload: data
});

export const UPDATE_WORD_PAIRS_AFTER_DELETION =
  'UPDATE_WORD_PAIRS_AFTER_DELETION';
export const updateWordPairsAfterDeletion = pairIds => ({
  type: UPDATE_WORD_PAIRS_AFTER_DELETION,
  payload: pairIds
});

export const UPDATE_WORD_PAIRS_AFTER_ADDITION =
  'UPDATE_WORD_PAIRS_AFTER_ADDITION';
export const updateWordPairsAfterAddition = wordPair => ({
  type: UPDATE_WORD_PAIRS_AFTER_ADDITION,
  payload: wordPair
});

export const UPDATE_WORD_PAIRS_AFTER_EDITING =
  'UPDATE_WORD_PAIRS_AFTER_EDITING';
export const updateWordPairsAfterEditing = (pairId, wordPair) => ({
  type: UPDATE_WORD_PAIRS_AFTER_EDITING,
  payload: {
    pairId: pairId,
    wordPair: wordPair
  }
});
