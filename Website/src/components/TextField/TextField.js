import React from 'react';
import PropTypes from 'prop-types';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import TextFieldLabel from './TextFieldLabel';
import TextFieldInput from './TextFieldInput';

const base = css`
  position: relative;
  font-size: 1rem;
`;

const TextField = React.forwardRef(function TextField(props, ref) {
  const {
    id,
    label,
    defaultValue,
    value,
    required,
    disabled,
    onChange,
    onFocus,
    onBlur,
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
    <div css={base} className={className}>
      <TextFieldLabel
        htmlFor={id}
        compact={focused || !empty}
        active={focused}
        required={required}
        disabled={disabled}
      >
        {label}
      </TextFieldLabel>
      <TextFieldInput
        ref={ref}
        id={id}
        placeholder={label}
        defaultValue={defaultValue}
        value={value}
        required={required}
        disabled={disabled}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        fullWidth={fullWidth}
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
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  fullWidth: PropTypes.bool,
  className: PropTypes.string
};

export default TextField;
