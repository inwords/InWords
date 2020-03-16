import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './CardActions.css';

function CardActions({ className, ...rest }) {
  return <div className={classNames('card-actions', className)} {...rest} />;
}

CardActions.propTypes = {
  className: PropTypes.string
};

export default CardActions;
