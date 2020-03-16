import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './CardContent.css';

function CardContent({ className, ...rest }) {
  return <div className={classNames('card-content', className)} {...rest} />;
}

CardContent.propTypes = {
  className: PropTypes.string
};

export default CardContent;
