import trainingHistory from 'src/reducers/trainingHistory';
import { INITIALIZE_TRAINING_HISTORY } from 'src/actions/trainingActions';

describe('trainingHistory reducer', () => {
  it('should return the initial state', () => {
    expect(trainingHistory(undefined, {})).toEqual([]);
  });
  const recentTrainings = [
    {
      levelId: 1,
      stars: 3,
      isAvailable: true,
      level: 1
    },
    {
      levelId: 1,
      stars: 3,
      isAvailable: true,
      level: 1
    }
  ];

  it('should handle INITIALIZE_TRAINING_HISTORY', () => {
    expect(
      trainingHistory(undefined, {
        type: INITIALIZE_TRAINING_HISTORY,
        payload: recentTrainings
      })
    ).toEqual(recentTrainings.slice().reverse());
  });
});
