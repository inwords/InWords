import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './FormGroup.css';

function FormGroup({ className, ...rest }) {
  return <div className={classNames('form-group', className)} {...rest} />;
}

FormGroup.propTypes = {
  className: PropTypes.string
};

export default FormGroup;
