import { GRANT_ACCESS } from 'src/actions/accessActions';

const initialState = {
  token: null,
  userId: null
};

export default function access(state = initialState, action) {
  if (action.type === GRANT_ACCESS) {
    return {
      token: action.payload.token,
      userId: action.payload.userId
    };
  }

  return state;
}
