import React from 'react';
import PropTypes from 'prop-types';

/** @jsx jsx */
import { jsx, css } from '@emotion/core';

const styles = {
  root: css`
    display: block;
    border: 1px solid var(--color-divider);
    border-radius: 0;
    padding: 14px 12px;
    font: inherit;
    color: var(--color-text-primary);
    transition: border-color 0.15s ease;
    -webkit-appearance: none;

    &::-webkit-input-placeholder {
      color: transparent;
    }
    &::-moz-placeholder {
      color: transparent;
    }
    &:-ms-input-placeholder {
      color: transparent;
    }
    &::-ms-input-placeholder {
      color: transparent;
    }

    &:hover {
      border-color: var(--color-divider-dark);
    }

    &:focus {
      outline: 2px solid var(--color-primary);
      outline-offset: -2px;
      border-color: var(--color-primary);
    }
  `,
  modifierFullWidth: fullWidth =>
    fullWidth &&
    css`
      width: 100%;
    `,
  modifierDisabled: disabled =>
    disabled &&
    css`
      pointer-events: none;
      color: var(--color-text-disabled);
      border-color: var(--color-disabled);
      background-color: var(--color-disabled);
    `
};

const TextFieldInput = React.forwardRef(function TextFieldInput(props, ref) {
  const { fullWidth, disabled, className, ...rest } = props;

  return (
    <input
      ref={ref}
      css={[
        styles.root,
        styles.modifierFullWidth(fullWidth),
        styles.modifierDisabled(disabled)
      ]}
      {...rest}
    />
  );
});

TextFieldInput.propTypes = {
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool
};

export default TextFieldInput;
