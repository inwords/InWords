import { useState } from 'react';
import PropTypes from 'prop-types';

function useTabsBehaviour(initialState = 0) {
    const [value, setValue] = useState(initialState);

    const handleChange = (event, value) => {
        setValue(value);
    };

    return [value, handleChange];
}

useTabsBehaviour.propTypes = {
    initialState: PropTypes.number,
};

export default useTabsBehaviour;
