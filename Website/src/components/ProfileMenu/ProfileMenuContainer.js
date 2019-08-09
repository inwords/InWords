import React, { useCallback, memo } from 'react';
import { useDispatch } from 'react-redux';
import { denyAccess as denyAccessAction } from 'actions/accessActions';
import ProfileMenu from './ProfileMenu';

function ProfileMenuContainer() {
  const dispatch = useDispatch();
  const denyAccess = useCallback(() => {
    dispatch(denyAccessAction());
  }, [dispatch]);

  return <ProfileMenu denyAccess={denyAccess} />;
}

export default memo(ProfileMenuContainer);
