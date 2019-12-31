import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Button.scss';

function Button({ component = 'button', primary = false, className, ...rest }) {
  const Component = component;

  return (
    <Component
      className={classNames(
        'button',
        `button--${primary ? 'primary' : 'default'}`,
        className
      )}
      {...rest}
    />
  );
}

Button.propTypes = {
  component: PropTypes.elementType,
  primary: PropTypes.bool
};

export default Button;
