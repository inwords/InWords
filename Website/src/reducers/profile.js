import {
  INITIALIZE_USER_INFO,
  UPDATE_USER_INFO
} from 'src/actions/profileActions';

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

const profile = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_USER_INFO: {
      const payload = action.payload;

      return {
        userId: payload.userId,
        nickname: payload.nickName,
        avatarPath: payload.avatarPath,
        experience: payload.experience,
        email: payload.email
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

export default profile;
