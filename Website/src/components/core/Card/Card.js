import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Paper from 'src/components/core/Paper';

import './Card.css';

function Card({ className, ...rest }) {
  return <Paper className={classNames('card', className)} {...rest} />;
}

Card.propTypes = {
  className: PropTypes.string
};

export default Card;
