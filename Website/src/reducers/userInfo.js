import { INITIALIZE_USER_INFO, UPDATE_USER_INFO } from 'actions/userActions';

const initialState = {
  userId: null,
  nickname: '',
  avatarPath: '',
  experience: 0
};

export default function userInfo(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_USER_INFO:
      return {
        userId: action.payload.userId || initialState.userId,
        nickname: action.payload.nickName || initialState.nickname,
        avatarPath: action.payload.avatarPath || initialState.avatarPath,
        experience: action.payload.experience || initialState.experience
      };
    case UPDATE_USER_INFO:
      return {
        ...state,
        nickname: action.payload.nickname,
        avatarPath: action.payload.avatarPath
      };
    default:
      return state;
  }
}
