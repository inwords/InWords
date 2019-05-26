import React from 'react';
import PropTypes from 'prop-types';

function useForm(initialState = {}, callback = () => { }) {
    const [values, setValues] = React.useState(initialState);

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit = event => {
        callback();
        event.preventDefault();
    };

    const handleReset = () => {
        setValues(initialState);
    };

    return {
        values,
        handleChange,
        handleSubmit,
        handleReset
    };
}

useForm.propTypes = {
    initialState: PropTypes.object,
    callback: PropTypes.func
};

export default useForm;
