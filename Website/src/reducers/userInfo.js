import * as userConstants from 'constants/userContants';

const initialState = {
  userId: null,
  nickName: '',
  avatarPath: '',
  experience: 0
};

const userInfo = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.INITIALIZE_USER_INFO:
      return {
        userId: action.payload.userId || initialState.userId,
        nickName: action.payload.nickName || initialState.nickName,
        avatarPath: action.payload.avatarPath || initialState.avatarPath,
        experience: action.payload.experience || initialState.experience
      };
    case userConstants.UPDATE_USER_INFO:
      return {
        ...state,
        nickName: action.payload.nickName,
        avatarPath: action.payload.avatarPath
      };
    default:
      return state;
  }
};

export default userInfo;
