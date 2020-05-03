import { INITIALIZE_TRAINING_HISTORY } from 'src/actions/trainingActions';

const trainingHistory = (state = [], action) => {
  switch (action.type) {
    case INITIALIZE_TRAINING_HISTORY:
      return (action.payload || []).slice(0, 30).reverse();
    default:
      return state;
  }
};

export default trainingHistory;
