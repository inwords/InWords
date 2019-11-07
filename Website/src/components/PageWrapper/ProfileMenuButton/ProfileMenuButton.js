import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import useMenu from 'src/hooks/useMenu';

function ProfileMenuButton({ handleLogout }) {
  const { anchorEl, handleClick, handleClose } = useMenu();

  return (
    <>
      <IconButton
        aria-label="user account"
        aria-controls="profile-menu"
        aria-haspopup="true"
        onClick={handleClick}
        edge="end"
        color="inherit"
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
        <MenuItem component={Link} to="/account" onClick={handleClose}>
          Аккаунт
        </MenuItem>
        <Divider />
        <MenuItem
          component={Link}
          to="/signIn"
          onClick={() => {
            handleLogout();
            handleClose();
          }}
        >
          Выйти
        </MenuItem>
      </Menu>
    </>
  );
}

ProfileMenuButton.propTypes = {
  handleLogout: PropTypes.func.isRequired
};

export default ProfileMenuButton;
