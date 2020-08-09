import React, { Fragment, useContext, memo } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { denyAccess } from 'src/actions/authActions';
import { removeState } from 'src/localStorage';
import { OAuth2Context } from 'src/components/app/OAuth2Manager';
import Icon from 'src/components/core/Icon';
import IconButton from 'src/components/core/IconButton';
import ResponsiveMenu from 'src/components/core/ResponsiveMenu';
import MenuItem from 'src/components/core/MenuItem';
import usePopup from 'src/components/core/usePopup';
import PopupContainer from 'src/components/core/PopupContainer';
import Popup from 'src/components/core/Popup';
import ButtonBase from 'src/components/core/ButtonBase';

function ControlledProfileMenu({ authorized }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const { initialized } = useContext(OAuth2Context);

  const handleLogout = async () => {
    try {
      if (!initialized) return;

      const auth2 = window.gapi.auth2.getAuthInstance();
      if (auth2 != null) {
        try {
          await auth2.signOut();
          auth2.disconnect();
        } catch (error) {
          // die
        }
      }
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
        aria-label="меню профиля"
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
          {authorized ? (
            <Fragment>
              <li>
                <MenuItem component={Link} to="/profile" onClick={handleClose}>
                  Профиль
                </MenuItem>
              </li>
              <li>
                <MenuItem
                  component={ButtonBase}
                  onClick={() => {
                    handleLogout();
                    handleClose();
                  }}
                >
                  Выйти
                </MenuItem>
              </li>
            </Fragment>
          ) : (
            <Fragment>
              <li>
                <MenuItem component={Link} to="/sign-in" onClick={handleClose}>
                  Войти
                </MenuItem>
              </li>
              <li>
                <MenuItem component={Link} to="/sign-up" onClick={handleClose}>
                  Создать аккаунт
                </MenuItem>
              </li>
            </Fragment>
          )}
        </ResponsiveMenu>
      </Popup>
    </PopupContainer>
  );
}

ControlledProfileMenu.propTypes = {
  authorized: PropTypes.bool.isRequired
};

export default memo(ControlledProfileMenu);
