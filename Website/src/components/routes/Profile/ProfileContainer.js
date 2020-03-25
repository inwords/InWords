import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSnackbar } from 'src/actions/commonActions';
import { initializeUserInfo } from 'src/actions/profileActions';
import { receiveUserInfo } from 'src/actions/profileApiActions';
import Profile from './Profile';

function ProfileContainer() {
  const { nickname, avatarPath, account } = useSelector(store => store.profile);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!account.accountId) {
      (async () => {
        try {
          const data = await dispatch(receiveUserInfo());
          dispatch(initializeUserInfo(data));
        } catch (error) {
          dispatch(setSnackbar({ text: 'Не удалось загрузить профиль' }));
        }
      })();
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
