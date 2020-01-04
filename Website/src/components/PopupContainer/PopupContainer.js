import React from 'react';
import classNames from 'classnames';

import './PopupContainer.css';

function PopupContainer({ className, ...rest }) {
  return <div className={classNames('popup-container', className)} {...rest} />;
}

export default PopupContainer;
