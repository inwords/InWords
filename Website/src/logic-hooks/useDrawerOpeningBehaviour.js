import { useState } from 'react';
import PropTypes from 'prop-types';

function useDrawerOpeningBehaviour(initialState = false) {
    const [open, setOpen] = useState(initialState);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return [open, handleDrawerOpen, handleDrawerClose];
}

useDrawerOpeningBehaviour.propTypes = {
    initialState: PropTypes.bool,
};

export default useDrawerOpeningBehaviour;
