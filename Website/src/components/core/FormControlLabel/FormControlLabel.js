import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './FormControlLabel.css';

function FormControlLabel({ children, className, ...rest }) {
  return (
    <label className={classNames('form-control-label', className)} {...rest}>
      {children}
    </label>
  );
}

FormControlLabel.propTypes = {
  children: PropTypes.node.isRequired
};

export default FormControlLabel;
