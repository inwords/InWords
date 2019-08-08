import * as userConstants from 'constants/userContants';

const initialState = {
  userId: null,
  nickname: '',
  avatarPath: '',
  experience: 0
};

export default function userInfo(state = initialState, action) {
  switch (action.type) {
    case userConstants.INITIALIZE_USER_INFO:
      return {
        userId: action.payload.userId || initialState.userId,
        nickname: action.payload.nickName || initialState.nickname,
        avatarPath: action.payload.avatarPath || initialState.avatarPath,
        experience: action.payload.experience || initialState.experience
      };
    case userConstants.UPDATE_USER_INFO:
      return {
        ...state,
        nickname: action.payload.nickname,
        avatarPath: action.payload.avatarPath
      };
    default:
      return state;
  }
}
