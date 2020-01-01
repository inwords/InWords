import React from 'react';
import classNames from 'classnames';

import './List.css';

function List({ className, ...rest }) {
  return <div className={classNames('list', className)} {...rest} />;
}

export default List;
