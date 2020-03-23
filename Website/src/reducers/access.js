import { GRANT_ACCESS } from 'src/actions/accessActions';

const initialState = {
  token: null,
  userId: null
};

const access = (state = initialState, action) => {
  if (action.type === GRANT_ACCESS) {
    const payload = action.payload;

    return {
      token: payload.token,
      userId: payload.userId
    };
  }

  return state;
};

export default access;
