import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import useCombinedRefs from 'src/hooks/useCombinedRefs';
import Input from 'src/components/core/Input';

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
    multiline = false,
    fullWidth = false,
    inputProps,
    className,
    ...rest
  },
  ref
) {
  const [filled, setFilled] = React.useState(Boolean(value));
  const [focused, setFocused] = React.useState(false);

  const inputRef = React.useRef();
  const combinedRef = useCombinedRefs(ref, inputRef);

  React.useEffect(() => {
    setFilled(Boolean(combinedRef.current.value));
  }, [combinedRef]);

  React.useEffect(() => {
    if (value !== undefined) {
      setFilled(Boolean(value));
    }
  }, [value]);

  const handleInputChange = event => {
    setFilled(Boolean(event.target.value));

    if (onChange) {
      onChange(event);
    }
  };

  const handleInputFocus = event => {
    setFocused(true);

    if (onFocus) {
      onFocus(event);
    }
  };

  const handleInputBlur = event => {
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
          'text-field__label--compact': focused || filled,
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
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        multiline={multiline}
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
  multiline: PropTypes.bool,
  fullWidth: PropTypes.bool,
  inputProps: PropTypes.object,
  className: PropTypes.string
};

export default TextField;
