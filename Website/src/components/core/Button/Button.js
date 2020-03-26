import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ButtonBase from 'src/components/core/ButtonBase';

import './Button.scss';

function Button({
  children,
  variant = 'contained',
  color = 'default',
  fullWidth = false,
  large = false,
  className,
  ...rest
}) {
  return (
    <ButtonBase
      className={classNames(
        'button',
        `button--${variant}-${color}`,
        {
          'button--full-width': fullWidth,
          'button--large': large
        },
        className
      )}
      {...rest}
    >
      <span className="button__label">{children}</span>
    </ButtonBase>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.string,
  color: PropTypes.string,
  fullWidth: PropTypes.bool,
  large: PropTypes.bool,
  className: PropTypes.string
};

export default Button;
