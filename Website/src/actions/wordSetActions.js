export const INITIALIZE_WORD_SETS = 'INITIALIZE_WORD_SETS';
export const initializWordSets = courses => ({
  type: INITIALIZE_WORD_SETS,
  payload: courses
});

export const INITIALIZE_WORD_SET_LEVELS_LIST =
  'INITIALIZE_WORD_SET_LEVELS_LIST';
export const initializeWordSetLevelsList = (wordSetId, levels) => ({
  type: INITIALIZE_WORD_SET_LEVELS_LIST,
  payload: {
    wordSetId,
    levels
  }
});

export const UPDATE_WORD_SET_LEVEL_RESULT = 'UPDATE_WORD_SET_LEVEL_RESULT';
export const updateWordSetLevelResult = (wordSetId, levelResult) => ({
  type: UPDATE_WORD_SET_LEVEL_RESULT,
  payload: {
    wordSetId,
    levelResult
  }
});

export const INITIALIZE_WORD_SET_LEVEL = 'INITIALIZE_WORD_SET_LEVEL';
export const initializeWordSetLevel = level => ({
  type: INITIALIZE_WORD_SET_LEVEL,
  payload: level
});

export const REMOVE_WORD_SET_LEVEL_PAIRS = 'REMOVE_WORD_SET_LEVEL_PAIRS';
export const removeWordSetLevelPairs = (levelId, pairIds) => ({
  type: REMOVE_WORD_SET_LEVEL_PAIRS,
  payload: {
    levelId,
    pairIds
  }
});

export const INITIALIZE_WORD_SET_PAIRS = 'INITIALIZE_WORD_SET_PAIRS';
export const initializeWordSetPairs = (wordSetId, wordPairs) => ({
  type: INITIALIZE_WORD_SET_PAIRS,
  payload: {
    wordSetId,
    wordPairs
  }
});

export const UPDATE_WORD_SET_PAIRS = 'UPDATE_WORD_SET_PAIRS';
export const updateWordSetPairs = (wordSetId, wordPairs) => ({
  type: UPDATE_WORD_SET_PAIRS,
  payload: {
    wordSetId,
    wordPairs
  }
});
