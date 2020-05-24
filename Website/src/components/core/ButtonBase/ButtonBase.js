import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import useFocusVisible from 'src/components/core/useFocusVisible';

import './ButtonBase.scss';

function ButtonBase({
  component: Component = 'button',
  onFocus: onFocusProp,
  onBlur: onBlurProp,
  className,
  ...rest
}) {
  const { focusVisible, onFocus, onBlur } = useFocusVisible();

  const handleFocus = event => {
    onFocus(event);

    if (onFocusProp) {
      onFocusProp(event);
    }
  };

  const handleBlur = event => {
    onBlur(event);

    if (onBlurProp) {
      onBlurProp(event);
    }
  };

  return (
    <Component
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={classNames(
        'button-base',
        {
          'focus-visible': focusVisible
        },
        className
      )}
      {...rest}
    />
  );
}

ButtonBase.propTypes = {
  component: PropTypes.elementType,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  className: PropTypes.string
};

export default ButtonBase;
