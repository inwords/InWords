import { GRANT_ACCESS } from 'src/actions/authActions';

const initialState = {
  token: null,
  userId: null
};

const auth = (state = initialState, action) => {
  if (action.type === GRANT_ACCESS) {
    const payload = action.payload;

    return {
      token: payload.token,
      userId: payload.userId
    };
  }

  return state;
};

export default auth;
