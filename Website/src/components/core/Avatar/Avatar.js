import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Avatar.scss';

function Avatar({ children, src, alt, className, style, ...rest }) {
  return (
    <div className={classNames('avatar', className)} style={style}>
      {(src && <img src={src} alt={alt} className="avatar__img" {...rest} />) ||
        children}
    </div>
  );
}

Avatar.propTypes = {
  children: PropTypes.node,
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object
};

export default Avatar;
