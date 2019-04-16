import commonConstants from "../constants/commonConstants";

const beginDataTransfer = () => ({
    type: commonConstants.DATA_TRANSFER_BEGIN
});

const endDataTransfer = () => ({
    type: commonConstants.DATA_TRANSFER_END
});

export const setErrorMessage = message => ({
    type: commonConstants.ERROR_MESSAGE_SETTING,
    payload: message
});

export const resetErrorMessage = () => ({
    type: commonConstants.ERROR_MESSAGE_RESET
});

export default {
    beginDataTransfer,
    endDataTransfer,
    setErrorMessage,
    resetErrorMessage
};
