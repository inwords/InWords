import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import usePopup from 'src/hooks/usePopup';
import Icon from 'src/components/core/Icon';
import Divider from 'src/components/core/Divider';
import IconButton from 'src/components/core/IconButton';
import PopupContainer from 'src/components/core/PopupContainer';
import Popup from 'src/components/core/Popup';
import ResponsiveMenu from 'src/components/core/ResponsiveMenu';
import MenuItem from 'src/components/core/MenuItem';

function ProfileMenuButton({ handleLogout }) {
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
              component={Link}
              to="/sign-in"
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

ProfileMenuButton.propTypes = {
  handleLogout: PropTypes.func.isRequired
};

export default ProfileMenuButton;
