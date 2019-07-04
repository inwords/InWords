import { useState } from 'react';

function useDrawer() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen(!open);
    };

    return {
        open,
        handleOpen,
        handleClose,
        handleToggle
    };
}

export default useDrawer;
