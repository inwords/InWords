import errorMessageConstants from '../constants/errorMessageConstants';

const errorMessage = (state = null, action) => {
    switch (action.type) {
        case errorMessageConstants.ERROR_MESSAGE_SETTING:
            return action.payload;
        case errorMessageConstants.ERROR_MESSAGE_RESET:
            return null;
        default:
            return state;
    }
};

export default errorMessage;
