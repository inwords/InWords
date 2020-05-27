export const INITIALIZE_TRAINING_HISTORY = 'INITIALIZE_TRAINING_HISTORY';
export const initializeTrainingHistory = history => ({
  type: INITIALIZE_TRAINING_HISTORY,
  payload: history
});
