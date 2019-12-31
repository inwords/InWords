import React from 'react';
import classNames from 'classnames';

import './DialogContent.css';

function DialogContent({ className, ...rest }) {
  return <div className={classNames('dialog-content', className)} {...rest} />;
}

export default DialogContent;
