import React from 'react';

function useDrawer() {
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return {
        open,
        handleDrawerOpen,
        handleDrawerClose
    };
}

export default useDrawer;
