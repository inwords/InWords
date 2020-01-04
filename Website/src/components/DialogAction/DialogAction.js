import React from 'react';
import classNames from 'classnames';

import './DialogAction.css';

function DialogAction({ className, ...rest }) {
  return <div className={classNames('dialog-action', className)} {...rest} />;
}

export default DialogAction;
