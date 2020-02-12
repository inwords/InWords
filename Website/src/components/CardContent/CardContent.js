import React from 'react';
import classNames from 'classnames';

import './CardContent.css';

function CardContent({ className, ...rest }) {
  return <div className={classNames('card-content', className)} {...rest} />;
}

export default CardContent;
