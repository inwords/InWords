import React from 'react';
import PropTypes from 'prop-types';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import IconButton from 'src/components/IconButton';

import './Checkbox.scss';

function Checkbox({
  id,
  tabIndex,
  checked,
  defaultChecked,
  required,
  disabled,
  onChange,
  inputProps,
  ...rest
}) {
  return (
    <IconButton as="span" color="primary" {...rest}>
      <div className="checkbox">
        {checked ? (
          <CheckBoxIcon />
        ) : (
          <CheckBoxOutlineBlankIcon color="action" />
        )}
        <input
          id={id}
          type="checkbox"
          tabIndex={tabIndex}
          checked={checked}
          defaultChecked={defaultChecked}
          required={required}
          disabled={disabled}
          onChange={onChange}
          className="checkbox__input"
          {...inputProps}
        />
      </div>
    </IconButton>
  );
}

Checkbox.propTypes = {
  id: PropTypes.number,
  tabIndex: PropTypes.number,
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  inputProps: PropTypes.object
};

export default Checkbox;
