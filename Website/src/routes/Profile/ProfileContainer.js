import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import withReceivedCommonUserInfo from 'src/HOCs/withReceivedCommonUserInfo';
import Profile from './Profile';

function ProfileContainer({ userId, nickname, avatarPath }) {
  const validUserId = useSelector(store => store.access.userId);

  return (
    <Profile
      avatarPath={avatarPath}
      nickname={nickname}
      editingAvailable={validUserId && validUserId === userId}
    />
  );
}

ProfileContainer.propTypes = {
  userId: PropTypes.number.isRequired,
  nickname: PropTypes.string.isRequired,
  avatarPath: PropTypes.string.isRequired
};

export default withReceivedCommonUserInfo(ProfileContainer);
