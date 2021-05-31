import trainingHistory from 'src/reducers/trainingHistory';
import { INITIALIZE_TRAINING_HISTORY } from 'src/actions/trainingActions';

describe('trainingHistory reducer', () => {
  it('should return the initial state', () => {
    expect(trainingHistory(undefined, {})).toEqual([]);
  });

  it('should handle INITIALIZE_TRAINING_HISTORY', () => {
    expect(
      trainingHistory(undefined, {
        type: INITIALIZE_TRAINING_HISTORY,
        payload: [
          {
            levelId: 1,
            isAvailable: true
          },
          {
            levelId: 2,
            isAvailable: true
          }
        ]
      })
    ).toEqual([
      {
        levelId: 2,
        isAvailable: true
      },
      {
        levelId: 1,
        isAvailable: true
      }
    ]);
  });
});
