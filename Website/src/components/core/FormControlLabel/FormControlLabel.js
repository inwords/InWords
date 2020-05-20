import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Typography from 'src/components/core/Typography';

import './FormControlLabel.scss';

function FormControlLabel({ control, label, disabled, className, ...rest }) {
  const controlProps = {
    disabled
  };

  return (
    <label
      className={classNames(
        'form-control-label',
        {
          'form-control-label--disabled': disabled
        },
        className
      )}
      {...rest}
    >
      {cloneElement(control, controlProps)}
      {label && (
        <Typography
          className={classNames({
            'form-control-label__label--disabled': disabled
          })}
        >
          {label}
        </Typography>
      )}
    </label>
  );
}

FormControlLabel.propTypes = {
  control: PropTypes.node.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

export default FormControlLabel;
