import userConstants from '../constants/userConstants';

const initialState = {
    userId: null,
    nickName: '',
    avatarPath: null,
    experience: 0
};

const userInfo = (state = initialState, action) => {
    switch (action.type) {
        case userConstants.USER_INFO_INITIALIZATION:
            return {
                userId: action.userInfo.userId,
                nickName: action.userInfo.nickName,
                avatarPath: action.userInfo.avatarPath,
                experience: action.userInfo.experience
            };
        case userConstants.USER_INFO_UPDATE:
            return {
                ...state,
                nickName: action.userInfo.NickName,
                avatarPath: action.userInfo.AvatarPath
            };
        default:
            return state;
    }
};

export default userInfo;
