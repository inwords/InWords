import { combineReducers } from 'redux';
import commonConstants from '../constants/commonConstants';

const loading = (state = false, action) => {
    switch (action.type) {
        case commonConstants.LOADING_BEGIN:
            return true;
        case commonConstants.LOADING_END:
            return false;
        default:
            return state;
    }
};

const errorMessage = (state = null, action) => {
    switch (action.type) {
        case commonConstants.ERROR_MESSAGE_SETTING:
            return action.payload;
        case commonConstants.ERROR_MESSAGE_RESET:
            return null;
        default:
            return state;
    }
};

const common = combineReducers({
    loading,
    errorMessage
});

export default common;
