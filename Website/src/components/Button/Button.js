import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './button.scss';

const Button = React.forwardRef(function Button(props, ref) {
  const {
    component = 'button',
    children,
    color = 'default',
    fullWidth = false,
    className,
    ...rest
  } = props;

  const ComponentProp = component;

  return (
    <ComponentProp
      ref={ref}
      className={classNames('button', `button--color--${color}`, {
        'button--full-width': fullWidth,
        [className]: className
      })}
      {...rest}
    >
      {children}
    </ComponentProp>
  );
});

Button.propTypes = {
  component: PropTypes.string,
  children: PropTypes.node,
  color: PropTypes.string,
  fullWidth: PropTypes.bool,
  className: PropTypes.string
};

export default Button;
