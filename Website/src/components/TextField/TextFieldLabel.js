import PropTypes from 'prop-types';

/** @jsx jsx */
import { jsx, css } from '@emotion/core';

const styles = {
  root: css`
    position: absolute;
    left: 10px;
    top: 15px;
    padding: 0 4px;
    color: var(--color-text-secondary);
    font: inherit;
    pointer-events: none;
    transform-origin: top left;
    transition: all 0.15s ease;
  `,
  modifierCompact: compact =>
    compact &&
    css`
      transform: translate(0, -21px) scale(0.75);
      background-color: #fff;
    `,
  modifierActive: active =>
    active &&
    css`
      color: var(--color-primary);
    `,
  modifierRequired: required =>
    required &&
    css`
      &::after {
        content: '*';
        margin-left: 3px;
      }
    `,
  modifierDisabled: disabled =>
    disabled &&
    css`
      color: var(--color-text-disabled);
    `
};

function TextFieldLabel(props) {
  const { children, compact, active, required, disabled, ...rest } = props;

  return (
    <label
      css={[
        styles.root,
        styles.modifierCompact(compact),
        styles.modifierActive(active),
        styles.modifierRequired(required),
        styles.modifierDisabled(disabled)
      ]}
      {...rest}
    >
      {children}
    </label>
  );
}

TextFieldLabel.propTypes = {
  children: PropTypes.node,
  compact: PropTypes.bool,
  active: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool
};

export default TextFieldLabel;
