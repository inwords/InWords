import * as accessConstants from 'constants/accessConstants';

export const grantAccess = data => ({
  type: accessConstants.GRANT_ACCESS,
  payload: data
});

export const denyAccess = () => ({
  type: accessConstants.DENY_ACCESS
});
