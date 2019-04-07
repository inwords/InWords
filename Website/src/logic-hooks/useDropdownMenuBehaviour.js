import { useState } from 'react';

function useDropdownMenuBehaviour() {
    const [anchorEl, setAnchorEl] = useState(null);
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
