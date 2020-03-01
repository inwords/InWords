import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Input.scss';

const Input = React.forwardRef(function Input({ className, ...rest }, ref) {
  return (
    <input ref={ref} className={classNames('input', className)} {...rest} />
  );
});

Input.propTypes = {
  className: PropTypes.string
};

export default Input;
