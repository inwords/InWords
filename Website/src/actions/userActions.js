export const INITIALIZE_USER_INFO = 'INITIALIZE_USER_INFO';
export const initializeUserInfo = userInfo => ({
  type: INITIALIZE_USER_INFO,
  payload: userInfo
});

export const UPDATE_USER_INFO = 'UPDATE_USER_INFO';
export const updateUserInfo = userInfo => ({
  type: UPDATE_USER_INFO,
  payload: userInfo
});
