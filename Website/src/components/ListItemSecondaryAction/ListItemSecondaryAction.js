import React from 'react';
import classNames from 'classnames';

import './ListItemSecondaryAction.css';

function ListItemSecondaryAction({ className, ...rest }) {
  return (
    <div
      className={classNames('list-item-secondary-action', className)}
      {...rest}
    />
  );
}

export default ListItemSecondaryAction;
