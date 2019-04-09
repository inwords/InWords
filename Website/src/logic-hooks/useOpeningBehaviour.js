import { useState } from 'react';
import PropTypes from 'prop-types';

function useOpeningBehaviour(initialState = false) {
    const [open, setOpen] = useState(initialState);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return [open, handleOpen, handleClose];
}

useOpeningBehaviour.propTypes = {
    initialState: PropTypes.bool,
};

export default useOpeningBehaviour;