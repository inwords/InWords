import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import useMenu from '../../hooks/useMenu';

function ProfileMenu({ handleSignOut }) {
  const { anchorEl, handleClick, handleClose } = useMenu();

  return (
    <div>
      <IconButton
        color="inherit"
        aria-label="User account"
        aria-controls="profile-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <AccountCircleIcon />
      </IconButton>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem component={Link} to="/profile" onClick={handleClose}>
          Профиль
        </MenuItem>
        <MenuItem component={Link} to="/signIn" onClick={handleSignOut}>
          Выйти
        </MenuItem>
      </Menu>
    </div>
  );
}

ProfileMenu.propTypes = {
  handleSignOut: PropTypes.func.isRequired,
};

export default ProfileMenu;
