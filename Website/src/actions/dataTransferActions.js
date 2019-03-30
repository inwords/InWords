import { dataTransferConstants } from '../constants/dataTransferConstants';

const beginDataTransfer = () => ({
    type: dataTransferConstants.DATA_TRANSFER_BEGIN
});

const endDataTransfer = () => ({
    type: dataTransferConstants.DATA_TRANSFER_END
});

export const dataTransferActions = {
    beginDataTransfer: beginDataTransfer,
    endDataTransfer: endDataTransfer
};
