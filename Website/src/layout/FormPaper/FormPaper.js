import React from 'react';
import classNames from 'classnames';
import Paper from 'src/components/Paper';

import './FormPaper.scss';

function FormPaper({ className, ...rest }) {
  return <Paper className={classNames('form-paper', className)} {...rest} />;
}

export default FormPaper;
