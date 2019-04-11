import accessConstants from '../constants/accessConstants';

const grantAccess = data => ({
    type: accessConstants.ACCESS_GRANT,
    payload: data
});

const denyAccess = () => ({
    type: accessConstants.ACCESS_DENIAL
});

export default {
    grantAccess,
    denyAccess
};
