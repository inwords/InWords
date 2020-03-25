import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { denyAccess } from 'src/actions/authActions';
import ProfileMenuButton from './ProfileMenuButton';

function ProfileMenuButtonContainer(props) {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(denyAccess());
  };

  return <ProfileMenuButton handleLogout={handleLogout} {...props} />;
}

export default memo(ProfileMenuButtonContainer);
