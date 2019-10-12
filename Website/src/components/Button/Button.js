import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './button.scss';

const Button = React.forwardRef(function Button(props, ref) {
  const {
    component = 'button',
    children,
    disabled = false,
    onClick,
    color = 'default',
    fullWidth = false,
    className,
    ...rest
  } = props;

  const handleClick = event => {
    if (disabled) {
      event.preventDefault();
    }
    if (onClick) {
      onClick(event);
    }
  };

  const ComponentProp = component;

  const buttonProps = {};
  if (ComponentProp === 'button') {
    buttonProps.disabled = disabled;
  } else {
    if (ComponentProp !== 'a') {
      buttonProps.role = 'button';
    }
    buttonProps['aria-disabled'] = disabled;
  }

  return (
    <ComponentProp
      ref={ref}
      className={classNames('button', `button--color--${color}`, {
        'button--full-width': fullWidth,
        'button--disabled': disabled,
        [className]: Boolean(className)
      })}
      onClick={handleClick}
      {...buttonProps}
      {...rest}
    >
      {children}
    </ComponentProp>
  );
});

Button.propTypes = {
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  children: PropTypes.node,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  color: PropTypes.string,
  fullWidth: PropTypes.bool,
  className: PropTypes.string
};

export default Button;
