import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { receiveUserInfo } from 'src/actions/userApiActions';

function withReceivedUserInfo(WrappedComponent) {
  function WithReceivedUserInfo({ ...rest }) {
    const {
      account: { accountId, email },
      nickname,
      avatarPath
    } = useSelector(store => store.userInfo);

    const dispatch = useDispatch();

    useEffect(() => {
      if (!accountId) {
        dispatch(receiveUserInfo());
      }
    }, [accountId, dispatch]);

    return (
      accountId && (
        <WrappedComponent
          email={email}
          nickname={nickname}
          avatarPath={avatarPath}
          {...rest}
        />
      )
    );
  }

  const wrappedComponentName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithReceivedUserInfo.displayName = `withReceivedUserInfo(${wrappedComponentName})`;

  return WithReceivedUserInfo;
}

export default withReceivedUserInfo;
