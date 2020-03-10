import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Avatar.scss';

function Avatar({ src, alt, className, ...rest }) {
  return (
    <div className={classNames('avatar', className)}>
      {(src && <img src={src} alt={alt} className="avatar__img" {...rest} />) ||
        (alt && alt.charAt(0))}
    </div>
  );
}

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string
};

export default Avatar;
