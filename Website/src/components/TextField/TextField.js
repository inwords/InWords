import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Input from 'src/components/Input';
import useCombinedRefs from 'src/hooks/useCombinedRefs';

import './TextField.scss';

const TextField = React.forwardRef(function TextField(
  {
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
  },
  ref
) {
  const [empty, setEmpty] = React.useState(!value);
  const [focused, setFocused] = React.useState(false);

  const inputRef = React.useRef();
  const combinedRef = useCombinedRefs(ref, inputRef);

  React.useEffect(() => {
    setEmpty(!combinedRef.current);
  }, [combinedRef]);

  React.useEffect(() => {
    setEmpty(!value);
  }, [value]);

  const handleChange = event => {
    setEmpty(!event.target.value);

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
      <Input
        ref={combinedRef}
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
        className="text-field__input"
        {...inputProps}
      />
    </div>
  );
});

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
