import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ButtonBase from 'src/components/core/ButtonBase';

import './IconButton.scss';

function IconButton({
  component = 'button',
  disabled,
  color = 'default',
  edge,
  className,
  ...rest
}) {
  return (
    <ButtonBase
      component={component}
      className={classNames(
        'icon-button',
        `icon-button--color--${color}`,
        {
          [`icon-button--edge--${edge}`]: edge,
          ['icon-button--disabled']: component !== 'button' && disabled
        },
        className
      )}
      disabled={component === 'button' && disabled}
      {...rest}
    />
  );
}

IconButton.propTypes = {
  component: PropTypes.elementType,
  disabled: PropTypes.bool,
  color: PropTypes.string,
  edge: PropTypes.string,
  className: PropTypes.string
};

export default IconButton;
