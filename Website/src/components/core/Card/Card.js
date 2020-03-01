import React from 'react';
import classNames from 'classnames';
import Paper from 'src/components/core/Paper';

import './Card.css';

function Card({ className, ...rest }) {
  return <Paper className={classNames('card', className)} {...rest} />;
}

export default Card;
