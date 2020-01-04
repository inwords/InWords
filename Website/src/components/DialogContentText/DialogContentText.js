import React from 'react';
import classNames from 'classnames';

import './DialogContentText.scss';

function DialogContentText({ className, ...rest }) {
  return (
    <div className={classNames('dialog-content-text', className)} {...rest} />
  );
}

export default DialogContentText;
