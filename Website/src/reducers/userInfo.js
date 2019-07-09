import userConstants from '../constants/userContants';

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
                userId: action.payload.userId || null,
                nickName: action.payload.nickName || '',
                avatarPath: action.payload.avatarPath || '',
                experience: action.payload.experience || 0
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
