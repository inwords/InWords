import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Input.scss';

const Input = React.forwardRef(function Input(
  { multiline = false, className, ...rest },
  ref
) {
  const Component = !multiline ? 'input' : 'textarea';

  return (
    <Component
      ref={ref}
      className={classNames(
        'input',
        {
          'input--multiline': multiline
        },
        className
      )}
      {...rest}
    />
  );
});

Input.propTypes = {
  multiline: PropTypes.bool,
  className: PropTypes.string
};

export default Input;
