import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { denyAccess } from 'src/actions/authActions';
import { removeState } from 'src/localStorage';
import useOAuth2Logout from 'src/hooks/useOAuth2Logout';
import ProfileMenuButton from './ProfileMenuButton';

function ProfileMenuButtonContainer(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { handleOAuth2Logout } = useOAuth2Logout();

  const handleLogout = async () => {
    try {
      await handleOAuth2Logout();
    } catch (error) {
      // die
    } finally {
      dispatch(denyAccess());
      removeState();
      history.push('/sign-in');
    }
  };

  return <ProfileMenuButton handleLogout={handleLogout} {...props} />;
}

export default memo(ProfileMenuButtonContainer);
