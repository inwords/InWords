import React from 'react';
import PropTypes from 'prop-types';

/** @jsx jsx */
import { jsx, css } from '@emotion/core';

const styles = {
  root: css`
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 2px solid transparent;
    min-width: 120px;
    padding: 9px 12px;
    outline: 2px solid transparent;
    outline-offset: -2px;
    text-align: center;
    text-decoration: none;
    line-height: 1;
    font-size: 1rem;
    font-weight: 500;
    color: var(--color-on-neutral);
    background-color: var(--color-neutral);
    user-select: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      border-color: var(--color-neutral-dark);
    }

    &:active {
      transform: scale(0.98);
      background-color: var(--color-neutral-dark);
    }

    &:focus:not(:active) {
      outline-color: var(--color-on-neutral);
    }
  `,

  modifierPrimary: primary =>
    primary &&
    css`
      color: var(--color-on-primary);
      background-color: var(--color-primary);

      &:hover {
        border-color: var(--color-primary-dark);
      }

      &:active {
        background-color: var(--color-primary-dark);
      }

      &:focus:not(:active) {
        outline-color: var(--color-neutral);
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
      background-color: var(--color-disabled);
    `
};

const Button = React.forwardRef(function Button(props, ref) {
  const {
    component = 'button',
    children,
    onClick,
    primary = false,
    fullWidth = false,
    disabled = false,
    className,
    ...rest
  } = props;

  const handleClick = event => {
    if (disabled) {
      event.preventDefault();
    }
    if (onClick) {
      onClick(event);
    }
  };

  const Component = component;

  const buttonProps = {};
  if (Component === 'button') {
    buttonProps.disabled = disabled;
  } else {
    if (Component !== 'a') {
      buttonProps.role = 'button';
    }
    buttonProps['aria-disabled'] = disabled;
  }

  return (
    <Component
      ref={ref}
      css={[
        styles.root,
        styles.modifierPrimary(primary),
        styles.modifierFullWidth(fullWidth),
        styles.modifierDisabled(disabled)
      ]}
      onClick={handleClick}
      {...buttonProps}
      {...rest}
    >
      {children}
    </Component>
  );
});

Button.propTypes = {
  component: PropTypes.elementType,
  children: PropTypes.node,
  onClick: PropTypes.func,
  primary: PropTypes.bool,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

export default Button;
