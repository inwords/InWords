import React, { useCallback, memo } from 'react';
import { useDispatch } from 'react-redux';
import { denyAccess } from 'actions/accessActions';
import ProfileMenu from './ProfileMenu';

function ProfileMenuContainer() {
  const dispatch = useDispatch();
  const handleLogout = useCallback(() => {
    dispatch(denyAccess());
  }, [dispatch]);

  return <ProfileMenu handleLogout={handleLogout} />;
}

export default memo(ProfileMenuContainer);
