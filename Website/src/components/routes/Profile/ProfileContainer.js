import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { receiveUserInfo } from 'src/actions/userApiActions';
import Profile from './Profile';

function ProfileContainer() {
  const { nickname, avatarPath, account } = useSelector(
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
      <Profile
        avatarPath={avatarPath}
        nickname={nickname}
        email={account.email}
      />
    )
  );
}

export default ProfileContainer;
