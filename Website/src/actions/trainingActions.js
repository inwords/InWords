export const INITIALIZE_TRAINING_CATEGORIES = 'INITIALIZE_TRAINING_CATEGORIES';
export const initializeTrainingCategories = trainingCategories => ({
  type: INITIALIZE_TRAINING_CATEGORIES,
  payload: trainingCategories
});

export const INITIALIZE_TRAINING_CATEGORY = 'INITIALIZE_TRAINING_CATEGORY';
export const initializeTrainingCategory = trainingCategory => ({
  type: INITIALIZE_TRAINING_CATEGORY,
  payload: trainingCategory
});

export const INITIALIZE_TRAINING_LEVEL = 'INITIALIZE_TRAINING_LEVEL';
export const initializeTrainingLevel = trainingLevel => ({
  type: INITIALIZE_TRAINING_LEVEL,
  payload: trainingLevel
});

export const UPDATE_LEVEL_RESULT = 'UPDATE_LEVEL_RESULT';
export const updateLevelResult = levelResult => ({
  type: UPDATE_LEVEL_RESULT,
  payload: levelResult
});
