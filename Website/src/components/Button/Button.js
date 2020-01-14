import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Button.scss';

function Button({
  component = 'button',
  variant = 'contained',
  color = 'default',
  fullWidth = false,
  className,
  ...rest
}) {
  const Component = component;

  return (
    <Component
      className={classNames(
        'button',
        `button--${variant}-${color}`,
        {
          'button--full-width': fullWidth
        },
        className
      )}
      {...rest}
    />
  );
}

Button.propTypes = {
  component: PropTypes.elementType,
  variant: PropTypes.string,
  color: PropTypes.string,
  fullWidth: PropTypes.bool
};

export default Button;
