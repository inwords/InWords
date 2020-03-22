import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from 'src/components/core/Button';

function LinkButton({
  component = 'a',
  disabled = false,
  children,
  className,
  ...rest
}) {
  return (
    <Button
      component={component}
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
  children: PropTypes.node,
  className: PropTypes.string
};

export default LinkButton;
