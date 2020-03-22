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
  className,
  ...rest
}) {
  return (
    <ButtonBase
      className={classNames(
        'button',
        `button--${variant}-${color}`,
        {
          'button--full-width': fullWidth
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
  className: PropTypes.string
};

export default Button;
