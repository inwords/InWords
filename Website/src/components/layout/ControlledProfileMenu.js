import React, { memo } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { denyAccess } from 'src/actions/authActions';
import { removeState } from 'src/localStorage';
import useOAuth2Logout from 'src/hooks/useOAuth2Logout';
import Icon from 'src/components/core/Icon';
import IconButton from 'src/components/core/IconButton';
import ResponsiveMenu from 'src/components/core/ResponsiveMenu';
import MenuItem from 'src/components/core/MenuItem';
import usePopup from 'src/hooks/usePopup';
import PopupContainer from 'src/components/core/PopupContainer';
import Popup from 'src/components/core/Popup';

function ControlledProfileMenu() {
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

  const { show, handleOpen, handleClose, anchorEl } = usePopup();

  return (
    <PopupContainer>
      <IconButton
        aria-label="user account"
        aria-controls="profile-menu"
        aria-haspopup="true"
        onClick={handleOpen}
        edge="end"
        color="inherit"
      >
        <Icon>account_circle</Icon>
      </IconButton>
      <Popup show={show} side="right" onClose={handleClose}>
        <ResponsiveMenu id="profile-menu" anchorEl={anchorEl} responsive={show}>
          <li>
            <MenuItem component={Link} to="/profile" onClick={handleClose}>
              Профиль
            </MenuItem>
          </li>
          <li>
            <MenuItem
              onClick={() => {
                handleLogout();
                handleClose();
              }}
            >
              Выйти
            </MenuItem>
          </li>
        </ResponsiveMenu>
      </Popup>
    </PopupContainer>
  );
}

export default memo(ControlledProfileMenu);
