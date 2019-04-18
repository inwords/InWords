import React from 'react';

function useDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return {
        open,
        handleClickOpen,
        handleClose
    };
}

export default useDialog;
