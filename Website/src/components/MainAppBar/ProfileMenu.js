import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

function ProfileMenu({ handleLogout, anchorEl, handleMenu, handleClose }) {
    const open = Boolean(anchorEl);

    return (
        <div>
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
                <MenuItem onClick={handleLogout}>Выйти</MenuItem>
            </Menu>
        </div>
    );
};

ProfileMenu.propTypes = {
    handleLogout: PropTypes.func.isRequired,
    anchorEl: PropTypes.bool,
    handleMenu: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired
};

export default ProfileMenu;
