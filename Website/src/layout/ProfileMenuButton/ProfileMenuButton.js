import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import usePopup from 'src/hooks/usePopup';
import Divider from 'src/components/Divider';
import IconButton from 'src/components/IconButton';
import PopupContainer from 'src/components/PopupContainer';
import Popup from 'src/components/Popup';
import ResponsiveMenu from 'src/components/ResponsiveMenu';
import MenuItem from 'src/components/MenuItem';

function ProfileMenuButton({ handleLogout }) {
  const { show, handleToggle, handleClose } = usePopup();

  const [anchorEl, setAnchorEl] = React.useState(null);

  return (
    <PopupContainer>
      <IconButton
        aria-label="user account"
        aria-controls="profile-menu"
        aria-haspopup="true"
        onClick={event => {
          setAnchorEl(event.currentTarget);
          handleToggle(event);
        }}
        edge="end"
        color="inherit"
      >
        <AccountCircleIcon />
      </IconButton>
      <Popup show={show} side="right">
        <ResponsiveMenu id="profile-menu" anchorEl={anchorEl} responsive={show}>
          <li>
            <MenuItem component={Link} to="/profile" onClick={handleClose}>
              Профиль
            </MenuItem>
          </li>
          <Divider />
          <li>
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
