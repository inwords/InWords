import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Divider from 'src/components/Divider';
import IconButton from 'src/components/IconButton';
import usePopup from 'src/hooks/usePopup';
import PopupContainer from 'src/components/PopupContainer';
import Popup from 'src/components/Popup';
import Menu from 'src/components/Menu';
import MenuItem from 'src/components/MenuItem';

const handleClickMenu = event => {
  event.stopPropagation();
};

const ProfileMenu = styled(Menu)`
  max-height: calc(100vh - 64px);
`;

function ProfileMenuButton({ handleLogout }) {
  const { show, handleToggle, handleClose } = usePopup();

  return (
    <PopupContainer>
      <IconButton
        aria-label="user account"
        aria-controls="profile-menu"
        aria-haspopup="true"
        onClick={handleToggle}
        edge="end"
        color="inherit"
      >
        <AccountCircleIcon />
      </IconButton>
      <Popup show={show} side="right">
        <ProfileMenu as="div" id="profile-menu" onClick={handleClickMenu}>
          <MenuItem as={Link} to="/profile" onClick={handleClose}>
            Профиль
          </MenuItem>
          <MenuItem as={Link} to="/account" onClick={handleClose}>
            Аккаунт
          </MenuItem>
          <Divider />
          <MenuItem
            as={Link}
            to="/signIn"
            onClick={() => {
              handleLogout();
              handleClose();
            }}
          >
            Выйти
          </MenuItem>
        </ProfileMenu>
      </Popup>
    </PopupContainer>
  );
}

ProfileMenuButton.propTypes = {
  handleLogout: PropTypes.func.isRequired
};

export default ProfileMenuButton;
