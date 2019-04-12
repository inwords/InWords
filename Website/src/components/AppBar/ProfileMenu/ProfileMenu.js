import React, { Fragment } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import useDropdownMenuBehaviour from '../../../hooks/useDropdownMenuBehaviour';

function ProfileMenu({ userId, handleLogout }) {
    const [open, anchorEl, handleMenu, handleClose] = useDropdownMenuBehaviour();

    return (
        <Fragment>
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
                <MenuItem component={Link} to={`/profile/${userId}`} onClick={handleClose}>Профиль</MenuItem>
                <MenuItem onClick={handleLogout}>Выйти</MenuItem>
            </Menu>
        </Fragment>
    );
};

ProfileMenu.propTypes = {
    userId: PropTypes.number.isRequired,
    handleLogout: PropTypes.func.isRequired
};

export default ProfileMenu;
