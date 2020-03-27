import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { denyAccess } from 'src/actions/authActions';
import { removeState } from 'src/localStorage';
import useOAuth2Logout from 'src/hooks/useOAuth2Logout';
import ProfileMenuButton from './ProfileMenuButton';

function ProfileMenuButtonContainer(props) {
  const dispatch = useDispatch();
  const { handleOAuth2Logout } = useOAuth2Logout();

  const handleLogout = () => {
    dispatch(denyAccess());
    removeState();
    handleOAuth2Logout();
  };

  return <ProfileMenuButton handleLogout={handleLogout} {...props} />;
}

export default memo(ProfileMenuButtonContainer);
