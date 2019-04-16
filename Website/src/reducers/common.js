import { combineReducers } from 'redux';
import commonConstants from '../constants/commonConstants';

const dataTransferInProgress = (state = false, action) => {
    switch (action.type) {
        case commonConstants.DATA_TRANSFER_BEGIN:
            return true;
        case commonConstants.DATA_TRANSFER_END:
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
    dataTransferInProgress,
    errorMessage
});

export default common;
