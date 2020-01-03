import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './TextField.scss';

function TextField({
  id,
  placeholder,
  name,
  type,
  autoComplete,
  defaultValue,
  value,
  required,
  disabled,
  onChange,
  onFocus,
  onBlur,
  fullWidth = false,
  className,
  inputProps,
  ...rest
}) {
  const [empty, setEmpty] = React.useState(!(value || defaultValue));
  const [focused, setFocused] = React.useState(false);

  React.useEffect(() => {
    setEmpty(!value);
  }, [value]);

  const handleChange = event => {
    if (event.target.value) {
      setEmpty(false);
    } else {
      setEmpty(true);
    }

    if (onChange) {
      onChange(event);
    }
  };

  const handleFocus = event => {
    setFocused(true);

    if (onFocus) {
      onFocus(event);
    }
  };

  const handleBlur = event => {
    setFocused(false);

    if (onBlur) {
      onBlur(event);
    }
  };

  return (
    <div
      className={classNames(
        'text-field',
        {
          'text-field--full-width': fullWidth
        },
        className
      )}
      {...rest}
    >
      <label
        htmlFor={id}
        className={classNames('text-field__label', {
          'text-field__label--compact': focused || !empty,
          'text-field__label--active': focused,
          'text-field__label--required': required,
          'text-field__label--disabled': disabled
        })}
      >
        {placeholder}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        required={required}
        disabled={disabled}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={classNames('text-field__input', {
          'text-field__label--active': focused
        })}
        {...inputProps}
      />
    </div>
  );
}

TextField.propTypes = {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string,
  type: PropTypes.string,
  autoComplete: PropTypes.string,
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  fullWidth: PropTypes.bool,
  className: PropTypes.string
};

export default TextField;
