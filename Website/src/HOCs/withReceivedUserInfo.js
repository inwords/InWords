import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { receiveUserInfo } from 'src/actions/userApiActions';

function withReceivedUserInfo(WrappedComponent) {
  function WithReceivedUserInfo({ ...rest }) {
    const { userId, nickname, avatarPath, account } = useSelector(
      store => store.userInfo
    );

    const dispatch = useDispatch();

    React.useEffect(() => {
      if (!account.accountId) {
        dispatch(receiveUserInfo());
      }
    }, [account.accountId, dispatch]);

    return (
      account.accountId && (
        <WrappedComponent
          userId={userId}
          nickname={nickname}
          avatarPath={avatarPath}
          account={account}
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
