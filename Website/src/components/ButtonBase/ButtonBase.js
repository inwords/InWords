import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './button-base.scss';

const ButtonBase = React.forwardRef(function ButtonBase(props, ref) {
  const {
    component = 'button',
    children,
    disabled = false,
    onClick,
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

  const Component = component;

  const buttonProps = {};
  if (Component === 'button') {
    buttonProps.disabled = disabled;
  } else {
    if (Component !== 'a') {
      buttonProps.role = 'button';
    }
    buttonProps['aria-disabled'] = disabled;
  }

  return (
    <Component
      ref={ref}
      className={classNames('button-base', {
        'button--disabled': disabled,
        [className]: Boolean(className)
      })}
      onClick={handleClick}
      {...buttonProps}
      {...rest}
    >
      {children}
    </Component>
  );
});

ButtonBase.propTypes = {
  component: PropTypes.elementType,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string
};

export default ButtonBase;
