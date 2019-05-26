import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import ButtonWithMenu from '../../shared/ButtonWithMenu';

function ButtonWithProfileMenu({ handleLogout }) {
    return (
        <ButtonWithMenu
            id="menu-appbar"
            icon={<AccountCircleIcon />}
            render={handleClose => ([
                <MenuItem key="1" component={Link} to="/profile" onClick={handleClose}>Профиль</MenuItem>,
                <MenuItem key="2" component={Link} to="/login" onClick={handleLogout}>Выйти</MenuItem>
            ])}
        />
    );
}

ButtonWithProfileMenu.propTypes = {
    handleLogout: PropTypes.func.isRequired
};

export default ButtonWithProfileMenu;
