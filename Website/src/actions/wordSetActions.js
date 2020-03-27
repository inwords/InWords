export const INITIALIZE_WORD_SETS = 'INITIALIZE_WORD_SETS';
export const initializWordSets = courses => ({
  type: INITIALIZE_WORD_SETS,
  payload: courses
});

export const INITIALIZE_WORD_SET = 'INITIALIZE_WORD_SET';
export const initializeWordSet = (id, wordSet) => ({
  type: INITIALIZE_WORD_SET,
  payload: {
    wordSetId: id,
    wordSet
  }
});

export const UPDATE_WORD_SET = 'UPDATE_WORD_SET';
export const updateWordSet = (id, wordPairs) => ({
  type: UPDATE_WORD_SET,
  payload: {
    wordSetId: id,
    wordPairs
  }
});
