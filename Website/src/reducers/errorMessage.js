import { errorMessageConstants } from '../constants/errorMessageConstants';

export const errorMessage = (state = null, action) => {
    if (action.type === errorMessageConstants.ERROR_MESSAGE_RESET) {
        return null;
    } else if (action.error) {
        return action.error;
    }
    return state;
};
