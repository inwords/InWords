import React from 'react';
import classNames from 'classnames';

import './CardActions.css';

function CardActions({ className, ...rest }) {
  return <div className={classNames('card-actions', className)} {...rest} />;
}

export default CardActions;
