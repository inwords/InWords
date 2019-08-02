import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import * as accessActions from 'actions/accessActions';
import ProfileMenu from './ProfileMenu';

function ProfileMenuContainer() {
  const dispatch = useDispatch();
  const denyAccess = useCallback(() => dispatch(accessActions.denyAccess()), [
    dispatch,
  ]);

  const handleSignOut = () => {
    denyAccess();
  };

  return <ProfileMenu handleSignOut={handleSignOut} />;
}

export default ProfileMenuContainer;
