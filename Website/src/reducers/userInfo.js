import userConstants from '../constants/userConstants';

const initialState = {
    userId: null,
    nickName: '',
    avatarPath: '',
    experience: 0
};

const userInfo = (state = initialState, action) => {
    switch (action.type) {
        case userConstants.USER_INFO_INITIALIZATION:
            return {
                userId: action.payload.userId || null,
                nickName: action.payload.nickName || '',
                avatarPath: action.payload.avatarPath || '',
                experience: action.payload.experience || 0
            };
        case userConstants.USER_INFO_UPDATE:
            return {
                ...state,
                nickName: action.payload.NickName,
                avatarPath: action.payload.AvatarPath
            };
        default:
            return state;
    }
};

export default userInfo;
