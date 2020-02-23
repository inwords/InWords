import React from 'react';
import classNames from 'classnames';

import './ListItemIcon.css';

function ListItemIcon({ className, ...rest }) {
  return <div className={classNames('list-item-icon', className)} {...rest} />;
}

export default ListItemIcon;
