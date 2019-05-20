import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import useDropdownMenu from '../../../hooks/useDropdownMenu';

function ProfileMenu({ handleLogout }) {
    const { anchorEl, open, handleMenu, handleClose } = useDropdownMenu();

    return (
        <>
            <IconButton
                aria-owns={open ? 'menu-appbar' : undefined}
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                <AccountCircle />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
            >
                <MenuItem component={Link} to="/profile" onClick={handleClose}>Профиль</MenuItem>
                <MenuItem component={Link} to="/login" onClick={handleLogout}>Выйти</MenuItem>
            </Menu>
        </>
    );
}

ProfileMenu.propTypes = {
    handleLogout: PropTypes.func.isRequired
};

export default ProfileMenu;
