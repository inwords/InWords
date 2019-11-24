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

const ProfileMenuItem = styled(MenuItem)`
  font-size: ${props => props.theme.typography.body1.fontSize};
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
          <ProfileMenuItem as={Link} to="/profile" onClick={handleClose}>
            Профиль
          </ProfileMenuItem>
          <ProfileMenuItem as={Link} to="/account" onClick={handleClose}>
            Аккаунт
          </ProfileMenuItem>
          <Divider />
          <ProfileMenuItem
            as={Link}
            to="/signIn"
            onClick={() => {
              handleLogout();
              handleClose();
            }}
          >
            Выйти
          </ProfileMenuItem>
        </ProfileMenu>
      </Popup>
    </PopupContainer>
  );
}

ProfileMenuButton.propTypes = {
  handleLogout: PropTypes.func.isRequired
};

export default ProfileMenuButton;
