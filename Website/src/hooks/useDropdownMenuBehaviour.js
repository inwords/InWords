import React from 'react';

function useDropdownMenuBehaviour() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return [open, anchorEl, handleMenu, handleClose];
}

export default useDropdownMenuBehaviour;
