import { useState } from 'react';
import PropTypes from 'prop-types';

function useDialogBehaviour(initialState = false) {
    const [open, setOpen] = useState(initialState);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return [open, handleOpen, handleClose];
}

useDialogBehaviour.propTypes = {
    initialState: PropTypes.bool,
};

export default useDialogBehaviour;
