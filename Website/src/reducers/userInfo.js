import {
  INITIALIZE_USER_INFO,
  UPDATE_USER_INFO
} from 'src/actions/userActions';

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

const userInfo = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_USER_INFO: {
      const payload = action.payload;

      return {
        userId: payload.userId,
        nickname: payload.nickName,
        avatarPath: payload.avatarPath,
        experience: payload.experience,
        account: {
          accountId: payload.account.accountId,
          email: payload.account.email
        }
      };
    }
    case UPDATE_USER_INFO:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default userInfo;
