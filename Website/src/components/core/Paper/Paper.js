import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Paper.scss';

function Paper({ component = 'div', depthShadow = 4, className, ...rest }) {
  const Component = component;

  return (
    <Component
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
}

Paper.propTypes = {
  component: PropTypes.elementType,
  depthShadow: PropTypes.number
};

export default Paper;
