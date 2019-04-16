import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton/index';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu/index';
import MenuItem from '@material-ui/core/MenuItem/index';
import useDropdownMenuBehaviour from '../../hooks/useDropdownMenuBehaviour';

function GameInfoCardMenu({ gameId, handleGamePackDeletion }) {
    const [open, anchorEl, handleMenu, handleClose] = useDropdownMenuBehaviour();

    return (
        <Fragment>
            <IconButton
                aria-owns={open ? 'menu-appbar' : undefined}
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                <MoreVertIcon />
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
                <MenuItem onClick={handleGamePackDeletion(gameId)}>Удалить</MenuItem>
            </Menu>
        </Fragment>
    );
};

GameInfoCardMenu.propTypes = {
    gameId: PropTypes.number.isRequired,
    handleGamePackDeletion: PropTypes.func.isRequired
};

export default GameInfoCardMenu;
