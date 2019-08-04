import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { receiveUserInfo as receiveUserInfoAction } from 'actions/userApiActions';

function withReceivedUserInfo(WrappedComponent) {
  function WithReceivedUserInfo({ ...rest }) {
    const userId = useSelector(store => store.access.userId);
    const userInfo = useSelector(store => store.userInfo);

    const dispatch = useDispatch();

    useEffect(() => {
      if (userId && userId !== userInfo.userId) {
        const receiveUserInfo = userId =>
          dispatch(receiveUserInfoAction(userId));

        receiveUserInfo(userId);
      }
    }, [userId, userInfo.userId, dispatch]);

    return (
      userInfo.userId && <WrappedComponent userInfo={userInfo} {...rest} />
    );
  }

  const wrappedComponentName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithReceivedUserInfo.displayName = `withReceivedUserInfo(${wrappedComponentName})`;

  return WithReceivedUserInfo;
}

export default withReceivedUserInfo;
