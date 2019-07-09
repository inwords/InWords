import accessConstants from '../constants/accessConstants';

const grantAccess = data => ({
    type: accessConstants.GRANT_ACCESS,
    payload: data
});

const denyAccess = () => ({
    type: accessConstants.DENY_ACCESS
});

export default {
    grantAccess,
    denyAccess
};
