export const SYNC_WORD_PAIRS = 'SYNC_WORD_PAIRS';
export const syncWordPairs = data => ({
  type: SYNC_WORD_PAIRS,
  payload: data
});

export const DELETE_WORD_PAIRS = 'DELETE_WORD_PAIRS';
export const deleteWordPairs = pairIds => ({
  type: DELETE_WORD_PAIRS,
  payload: pairIds
});

export const ADD_WORD_PAIRS = 'ADD_WORD_PAIRS';
export const addWordPairs = wordPairs => ({
  type: ADD_WORD_PAIRS,
  payload: wordPairs
});

export const UPDATE_WORD_PAIRS = 'UPDATE_WORD_PAIRS';
export const updateWordPairs = wordPairs => ({
  type: UPDATE_WORD_PAIRS,
  payload: wordPairs
});

export const RESET_WORD_PAIRS_ACTUALITY = 'RESET_WORD_PAIRS_ACTUALITY';
export const resetWordPairsActuality = () => ({
  type: RESET_WORD_PAIRS_ACTUALITY
});
