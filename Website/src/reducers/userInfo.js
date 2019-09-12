import { INITIALIZE_USER_INFO, UPDATE_USER_INFO } from 'actions/userActions';

const initialState = {
  userId: null,
  nickname: '',
  avatarPath: '',
  experience: 0,
  account: {
    accountId: null,
    email: ''
  }
};

export default function userInfo(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_USER_INFO:
      return {
        userId: action.payload.userId,
        nickname: action.payload.nickName,
        avatarPath: action.payload.avatarPath,
        experience: action.payload.experience,
        account: action.payload.account
          ? {
              accountId: action.payload.account.accountId,
              email: action.payload.account.email
            }
          : initialState.account
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
