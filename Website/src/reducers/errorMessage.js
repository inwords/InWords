import { errorConstants } from '../constants/errorConstants';

export const errorMessage = (state = null, action) => {
    if (action.type === errorConstants.RESET_ERROR_MESSAGE) {
        return null;
    } else if (action.error) {
        return action.error;
    }
    
    return state;
};
