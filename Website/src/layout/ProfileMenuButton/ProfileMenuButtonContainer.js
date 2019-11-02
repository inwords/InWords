import React, { useCallback, memo } from 'react';
import { useDispatch } from 'react-redux';
import { denyAccess } from 'src/actions/accessActions';
import ProfileMenuButton from './ProfileMenuButton';

function ProfileMenuButtonContainer({ ...rest }) {
  const dispatch = useDispatch();
  const handleLogout = useCallback(() => {
    dispatch(denyAccess());
  }, [dispatch]);

  return <ProfileMenuButton handleLogout={handleLogout} {...rest} />;
}

export default memo(ProfileMenuButtonContainer);
