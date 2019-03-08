import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({ name, checked = false, onChange }) => (
    <input type='checkbox' name={name} checked={checked} onChange={onChange} />
);

Checkbox.propTypes = {
    name: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
}

export default Checkbox;
