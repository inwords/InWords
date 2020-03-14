export const INITIALIZE_COURSES = 'INITIALIZE_COURSES';
export const initializeCourses = courses => ({
  type: INITIALIZE_COURSES,
  payload: courses
});

export const INITIALIZE_COURSE = 'INITIALIZE_COURSE';
export const initializeCourse = course => ({
  type: INITIALIZE_COURSE,
  payload: course
});

export const INITIALIZE_WORD_SET = 'INITIALIZE_WORD_SET';
export const initializeWordSet = (courseId, wordSet) => ({
  type: INITIALIZE_WORD_SET,
  payload: {
    courseId,
    wordSet
  }
});

export const INITIALIZE_LEVEL = 'INITIALIZE_LEVEL';
export const initializeLevel = level => ({
  type: INITIALIZE_LEVEL,
  payload: level
});

export const REMOVE_LEVEL_WORD_PAIRS = 'REMOVE_LEVEL_WORD_PAIRS';
export const removeLevelWordPairs = (levelId, pairIds) => ({
  type: REMOVE_LEVEL_WORD_PAIRS,
  payload: {
    levelId,
    pairIds
  }
});

export const UPDATE_LEVEL_RESULT = 'UPDATE_LEVEL_RESULT';
export const updateLevelResult = (courseId, levelResult) => ({
  type: UPDATE_LEVEL_RESULT,
  payload: {
    courseId,
    levelResult
  }
});

export const INITIALIZE_HISTORY = 'INITIALIZE_HISTORY';
export const initializeHistory = history => ({
  type: INITIALIZE_HISTORY,
  payload: history
});
