import { GRANT_ACCESS } from 'constants/accessConstants';

const initialState = {
  token: null,
  userId: null
};

function access(state = initialState, action) {
  if (action.type === GRANT_ACCESS) {
    return {
      token: action.payload.token || initialState.token,
      userId: action.payload.userId || initialState.userId
    };
  }

  return state;
}

export default access;
