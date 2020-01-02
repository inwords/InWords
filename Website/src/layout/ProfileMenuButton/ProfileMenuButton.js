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

const handleMenuClick = event => {
  event.stopPropagation();
};

const ProfileMenu = styled(Menu)`
  max-height: calc(100vh - 64px);
`;

const ProfileMenuItem = styled(MenuItem)`
  ${props => props.theme.typography.body2};
  color: ${props => props.theme.palette.text.primary};
`;

function ProfileMenuButton({ handleLogout }) {
  const { show, handleToggle, handleClose } = usePopup();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
    handleToggle(event);
  };

  return (
    <PopupContainer>
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
      <Popup show={show} side="right">
        <ProfileMenu
          id="profile-menu"
          anchorEl={anchorEl}
          onClick={handleMenuClick}
        >
          <li>
            <ProfileMenuItem
              component={Link}
              to="/profile"
              onClick={handleClose}
            >
              Профиль
            </ProfileMenuItem>
          </li>
          <Divider />
          <li>
            <ProfileMenuItem
              component={Link}
              to="/signIn"
              onClick={() => {
                handleLogout();
                handleClose();
              }}
            >
              Выйти
            </ProfileMenuItem>
          </li>
        </ProfileMenu>
      </Popup>
    </PopupContainer>
  );
}

ProfileMenuButton.propTypes = {
  handleLogout: PropTypes.func.isRequired
};

export default ProfileMenuButton;
