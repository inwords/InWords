import auth from 'src/reducers/auth';
import { GRANT_ACCESS } from 'src/actions/authActions';

describe('auth reducer', () => {
  const initialState = {
    token: null,
    userId: null
  };

  it('should return the initial state', () => {
    expect(auth(undefined, {})).toEqual(initialState);
  });

  it('should handle GRANT_ACCESS', () => {
    expect(
      auth(undefined, {
        type: GRANT_ACCESS,
        payload: {
          token: 'xyz',
          userId: 1
        }
      })
    ).toEqual({
      token: 'xyz',
      userId: 1
    });
  });
});
