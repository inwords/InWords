import React from 'react';
import classNames from 'classnames';
import Paper from 'src/components/core/Paper';

import './FormPaper.css';

function FormPaper({ className, ...rest }) {
  return <Paper className={classNames('form-paper', className)} {...rest} />;
}

export default FormPaper;
