import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Paper.scss';

const Paper = forwardRef(function Paper(
  {
    component: Component = 'div',
    square = false,
    depthShadow = 4,
    className,
    ...rest
  },
  ref
) {
  return (
    <Component
      ref={ref}
      className={classNames(
        'paper',
        {
          ['paper--rounded']: !square,
          [`paper--depth-shadow--${depthShadow}`]: depthShadow !== 0
        },
        className
      )}
      {...rest}
    />
  );
});

Paper.propTypes = {
  component: PropTypes.elementType,
  square: PropTypes.bool,
  depthShadow: PropTypes.number,
  className: PropTypes.string
};

export default Paper;
