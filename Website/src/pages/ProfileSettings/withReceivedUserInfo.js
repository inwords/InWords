import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { receiveUserInfo as receiveUserInfoAction } from 'actions/userApiActions';

function withReceivedUserInfo(WrappedComponent) {
  function WithReceivedUserInfo({ ...rest }) {
    const validUserId = useSelector(store => store.access.userId);
    const { userId, ...restUserInfo } = useSelector(store => store.userInfo);

    const dispatch = useDispatch();

    useEffect(() => {
      if (validUserId && validUserId !== userId) {
        const receiveUserInfo = userId => {
          dispatch(receiveUserInfoAction(userId));
        };

        receiveUserInfo(validUserId);
      }
    }, [validUserId, userId, dispatch]);

    return (
      userId && <WrappedComponent userId={userId} {...restUserInfo} {...rest} />
    );
  }

  const wrappedComponentName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithReceivedUserInfo.displayName = `withReceivedUserInfo(${wrappedComponentName})`;

  return WithReceivedUserInfo;
}

export default withReceivedUserInfo;
