import React, { Fragment, useState } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Divider from '@material-ui/core/Divider';

function ProfileMenu({ handleLogout }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    function handleMenu(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

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
                <MenuItem component={Link} to="/account" onClick={handleClose}>Профиль</MenuItem>
                <MenuItem component={Link} to="/settings" onClick={handleClose}>Настройки</MenuItem>
                <Divider light />
                <MenuItem onClick={handleLogout}>Выйти</MenuItem>
            </Menu>
        </Fragment>
    );
};

ProfileMenu.propTypes = {
    handleLogout: PropTypes.func.isRequired
};

export default ProfileMenu;
