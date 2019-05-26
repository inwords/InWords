import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import useDropdownMenu from '../../hooks/useDropdownMenu';

function ButtonWithMenu({ id, icon, render }) {
    const { anchorEl, open, handleMenu, handleClose } = useDropdownMenu();

    return (
        <>
            <IconButton
                aria-owns={open ? id : undefined}
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                {icon}
            </IconButton>
            <Menu
                id={id}
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
                {render(handleClose)}
            </Menu>
        </>
    );
}

ButtonWithMenu.propTypes = {
    id: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    render: PropTypes.func.isRequired
};

export default ButtonWithMenu;
