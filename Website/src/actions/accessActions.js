export const GRANT_ACCESS = 'GRANT_ACCESS';
export const grantAccess = data => ({
  type: GRANT_ACCESS,
  payload: data
});

export const DENY_ACCESS = 'DENY_ACCESS';
export const denyAccess = () => ({
  type: DENY_ACCESS
});
