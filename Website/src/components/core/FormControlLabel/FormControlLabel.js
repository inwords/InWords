import React from 'react';
import classNames from 'classnames';

import './FormControlLabel.css';

function FormControlLabel({ className, ...rest }) {
  return (
    <label className={classNames('form-control-label', className)} {...rest} />
  );
}

export default FormControlLabel;
