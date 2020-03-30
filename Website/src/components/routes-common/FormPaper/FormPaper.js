import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Paper from 'src/components/core/Paper';

import './FormPaper.css';

function FormPaper({ className, ...rest }) {
  return <Paper className={classNames('form-paper', className)} {...rest} />;
}

FormPaper.propTypes = {
  className: PropTypes.string
};

export default FormPaper;
