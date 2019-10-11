import React, { useCallback, memo } from 'react';
import { useDispatch } from 'react-redux';
import { denyAccess } from 'src/actions/accessActions';
import ProfileMenu from './ProfileMenu';

function ProfileMenuContainer({ ...rest }) {
  const dispatch = useDispatch();
  const handleLogout = useCallback(() => {
    dispatch(denyAccess());
  }, [dispatch]);

  return <ProfileMenu handleLogout={handleLogout} {...rest} />;
}

export default memo(ProfileMenuContainer);
