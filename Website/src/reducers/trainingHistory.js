import { INITIALIZE_TRAINING_HISTORY } from 'src/actions/trainingActions';

const trainingHistory = (state = [], action) => {
  switch (action.type) {
    case INITIALIZE_TRAINING_HISTORY:
      return (action.payload || []).reverse().slice(0, 30);
    default:
      return state;
  }
};

export default trainingHistory;
