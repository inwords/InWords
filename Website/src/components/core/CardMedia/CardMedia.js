import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './CardMedia.css';

function CardMedia({ src, alt, className, ...rest }) {
  return (
    <img
      className={classNames('card-media', className)}
      src={src}
      alt={alt}
      {...rest}
    />
  );
}

CardMedia.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string
};

export default CardMedia;
