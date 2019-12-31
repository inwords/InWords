import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Container.scss';

function Container({ maxWidth = 'md', className, ...rest }) {
  return (
    <div
      className={classNames(
        'container',
        `container--max-width--${maxWidth}`,
        className
      )}
      {...rest}
    />
  );
}

Container.propTypes = {
  maxWidth: PropTypes.string
};

export default Container;
