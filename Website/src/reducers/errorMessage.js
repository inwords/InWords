import { errorMessageConstants } from '../constants/errorMessageConstants';

export const errorMessage = (state = null, action) => {
    switch (action.type) {
        case errorMessageConstants.ERROR_MESSAGE_SET:
            console.log(action)
            return action.payload;
        case errorMessageConstants.ERROR_MESSAGE_RESET:
            return null;
        default:
            return state;
    }
};
