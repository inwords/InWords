import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './ButtonBase.css';

function ButtonBase({ component = 'button', className, ...rest }) {
  const Component = component;

  return (
    <Component className={classNames('button-base', className)} {...rest} />
  );
}

ButtonBase.propTypes = {
  component: PropTypes.elementType,
  onKeyDown: PropTypes.func,
  className: PropTypes.string
};

export default ButtonBase;
