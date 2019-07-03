import React from 'react';

function useDrawer() {
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    return {
        open,
        handleDrawerOpen,
        handleDrawerClose,
        handleDrawerToggle
    };
}

export default useDrawer;
