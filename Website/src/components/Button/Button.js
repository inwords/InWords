import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ButtonBase from 'src/components/ButtonBase';

import './Button.scss';

function Button({
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
    />
  );
}

Button.propTypes = {
  variant: PropTypes.string,
  color: PropTypes.string,
  fullWidth: PropTypes.bool
};

export default Button;
