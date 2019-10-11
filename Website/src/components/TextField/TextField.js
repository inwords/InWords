import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './text-field.scss';

const TextField = React.forwardRef(function TextField(props, ref) {
  const {
    id,
    label,
    defaultValue,
    value,
    onChange,
    onFocus,
    onBlur,
    disabled,
    fullWidth = false,
    className,
    ...rest
  } = props;
  const [empty, setEmpty] = React.useState(!Boolean(value || defaultValue));
  const [focused, setFocused] = React.useState(false);

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
      className={classNames('text-field', {
        [className]: className
      })}
    >
      <label
        className={classNames('text-field__label', {
          'text-field__label--elevated': focused || !empty,
          'text-field__label--active': focused,
          'text-field__label--disabled': disabled
        })}
        htmlFor={id}
      >
        {label}
      </label>
      <input
        ref={ref}
        id={id}
        placeholder={label}
        defaultValue={defaultValue}
        value={value}
        disabled={disabled}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={classNames('text-field__input', {
          "text-field__input--full-width": fullWidth
        })}
        {...rest}
      />
    </div>
  );
});

TextField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  className: PropTypes.string
};

export default TextField;
