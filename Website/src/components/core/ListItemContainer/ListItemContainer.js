import React from 'react';
import classNames from 'classnames';

import './ListItemContainer.css';

function ListItemContainer({ className, ...rest }) {
  return (
    <li className={classNames('list-item-container', className)} {...rest} />
  );
}

export default ListItemContainer;
