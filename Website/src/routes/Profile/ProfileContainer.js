import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { receiveUserInfoById } from 'src/actions/userApiActions';
import Profile from './Profile';

function ProfileContainer() {
  const params = useParams();

  const validUserId = useSelector(store => store.access.userId);
  const { userId, avatarPath, nickname, experience } = useSelector(
    store => store.userInfo
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const paramUserId = +params.userId;

    if (userId !== paramUserId) {
      dispatch(receiveUserInfoById(paramUserId));
    }
  }, [userId, params.userId, dispatch]);

  return (
    <Profile
      avatarPath={avatarPath}
      nickname={nickname}
      experience={experience}
      editingAvailable={validUserId && validUserId === userId}
    />
  );
}

export default ProfileContainer;
