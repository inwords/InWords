import { useState } from 'react';
import PropTypes from 'prop-types';

function useSimpleValues(initialState) {
    const [values, setValues] = useState(initialState);

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleReset = () => {
        setValues(initialState);
    };

    return [values, handleChange, handleReset];
}

useSimpleValues.propTypes = {
    initialState: PropTypes.object.isRequired,
};

export default useSimpleValues;
