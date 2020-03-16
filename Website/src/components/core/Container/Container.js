import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Container.scss';

function Container({ maxWidth = 'md', className, ...rest }) {
  return (
    <div
      className={classNames('container', `container--${maxWidth}`, className)}
      {...rest}
    />
  );
}

Container.propTypes = {
  maxWidth: PropTypes.string,
  className: PropTypes.string
};

export default Container;
