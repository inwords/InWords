import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from 'src/components/core/Button';

function LinkButton({
  component = 'a',
  disabled = false,
  tabIndex,
  children,
  className,
  ...rest
}) {
  return (
    <Button
      component={component}
      tabIndex={disabled ? -1 : tabIndex}
      className={classNames({ disabled }, className)}
      {...rest}
    >
      {children}
    </Button>
  );
}

LinkButton.propTypes = {
  component: PropTypes.elementType,
  disabled: PropTypes.bool,
  tabIndex: PropTypes.number,
  children: PropTypes.node,
  className: PropTypes.string
};

export default LinkButton;
