import { INITIALIZE_TRAINING_HISTORY } from 'src/actions/trainingActions';

const trainingHistory = (
  state = {
    actual: false,
    recentTrainings: []
  },
  action
) => {
  switch (action.type) {
    case INITIALIZE_TRAINING_HISTORY:
      return {
        actual: true,
        recentTrainings: (action.payload || []).slice(0, 30).reverse()
      };
    default:
      return state;
  }
};

export default trainingHistory;
