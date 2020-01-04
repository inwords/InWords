import React from 'react';
import classNames from 'classnames';

import './FormGroup.css';

function FormGroup({ className, ...rest }) {
  return <div className={classNames('form-group', className)} {...rest} />;
}

export default FormGroup;
