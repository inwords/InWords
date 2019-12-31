import React from 'react';
import classNames from 'classnames';

import './DialogActions.css';

function DialogActions({ className, ...rest }) {
  return <div className={classNames('dialog-actions', className)} {...rest} />;
}

export default DialogActions;
