import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Paper.scss';

const Paper = forwardRef(function Paper(
  { component = 'div', depthShadow = 4, className, ...rest },
  ref
) {
  const Component = component;

  return (
    <Component
      ref={ref}
      className={classNames(
        'paper',
        {
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
  depthShadow: PropTypes.number,
  className: PropTypes.string
};

export default Paper;
