export const INITIALIZE_TRAINING_CATEGORIES = 'INITIALIZE_TRAINING_CATEGORIES';
export const initializeTrainingCategories = trainingCategories => ({
  type: INITIALIZE_TRAINING_CATEGORIES,
  payload: trainingCategories
});

export const INITIALIZE_TRAINING_CATEGORY_INFO =
  'INITIALIZE_TRAINING_CATEGORY_INFO';
export const initializeTrainingCategoryInfo = categoryInfo => ({
  type: INITIALIZE_TRAINING_CATEGORY_INFO,
  payload: categoryInfo
});

export const UPDATE_TRAINING_CATEGORY_LEVEL_RESULT =
  'UPDATE_TRAINING_CATEGORY_LEVEL_RESULT';
export const updateTrainingCategoryLevelResult = levelResult => ({
  type: UPDATE_TRAINING_CATEGORY_LEVEL_RESULT,
  payload: levelResult
});

export const INITIALIZE_TRAINING_LEVEL = 'INITIALIZE_TRAINING_LEVEL';
export const initializeTrainingLevel = trainingLevel => ({
  type: INITIALIZE_TRAINING_LEVEL,
  payload: trainingLevel
});
