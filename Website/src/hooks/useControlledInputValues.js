import React from 'react';
import PropTypes from 'prop-types';

function useControlledInputValues(initialState) {
    const [values, setValues] = React.useState(initialState);

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleReset = () => {
        setValues(initialState);
    };

    return [values, handleChange, handleReset];
}

useControlledInputValues.propTypes = {
    initialState: PropTypes.object.isRequired,
};

export default useControlledInputValues;
