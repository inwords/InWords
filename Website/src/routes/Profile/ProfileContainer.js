import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import withReceivedUserInfo from 'src/HOCs/withReceivedUserInfo';
import Profile from './Profile';

function ProfileContainer({
  userId,
  nickname,
  avatarPath,
  account: { email }
}) {
  const validUserId = useSelector(store => store.access.userId);

  return (
    <Profile
      avatarPath={avatarPath}
      nickname={nickname}
      editingAvailable={validUserId && validUserId === userId}
      email={email}
    />
  );
}

ProfileContainer.propTypes = {
  userId: PropTypes.number.isRequired,
  nickname: PropTypes.string.isRequired,
  avatarPath: PropTypes.string.isRequired,
  account: PropTypes.shape({
    email: PropTypes.string.isRequired
  }).isRequired
};

export default withReceivedUserInfo(ProfileContainer);
