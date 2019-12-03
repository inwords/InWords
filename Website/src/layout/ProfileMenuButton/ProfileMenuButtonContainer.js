import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { denyAccess } from 'src/actions/accessActions';
import ProfileMenuButton from './ProfileMenuButton';

function ProfileMenuButtonContainer({ ...rest }) {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(denyAccess());
  };

  return <ProfileMenuButton handleLogout={handleLogout} {...rest} />;
}

export default memo(ProfileMenuButtonContainer);
