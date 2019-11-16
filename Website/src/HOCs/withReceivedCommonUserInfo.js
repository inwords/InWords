import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { receiveUserInfoById } from 'src/actions/userApiActions';

function withReceivedCommonUserInfo(WrappedComponent) {
  function WithReceivedCommonUserInfo({ ...rest }) {
    const params = useParams();

    const { userId, avatarPath, nickname } = useSelector(
      store => store.userInfo
    );

    const dispatch = useDispatch();

    const paramUserId = +params.userId;

    React.useEffect(() => {
      if (userId !== paramUserId) {
        dispatch(receiveUserInfoById(paramUserId));
      }
    }, [userId, paramUserId, dispatch]);

    return (
      userId === paramUserId && (
        <WrappedComponent
          userId={userId}
          avatarPath={avatarPath}
          nickname={nickname}
          {...rest}
        />
      )
    );
  }

  const wrappedComponentName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithReceivedCommonUserInfo.displayName = `withReceivedCommonUserInfo(${wrappedComponentName})`;

  return WithReceivedCommonUserInfo;
}

export default withReceivedCommonUserInfo;
