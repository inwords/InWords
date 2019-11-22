import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import IconButton from 'src/components/IconButton';

const CheckboxLabel = styled.span`
  display: flex;
  align-items: inherit;
  justify-content: inherit;
  width: 100%;
`;

const CheckboxInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: inherit;
`;

const CheckboxBox = styled.span`
  display: inline-block;
  width: 18px;
  height: 18px;
  border: solid;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${props =>
    props.checked
      ? props.theme.palette.primary.main
      : props.theme.palette.text.secondary};
  background-color: ${props =>
    props.checked ? props.theme.palette.primary.main : 'transparent'};
`;

const CheckboxMark = styled.span`
  display: ${props => (props.checked ? 'inline' : 'none')};
  position: absolute;
  left: 18px;
  top: 14px;
  width: 6px;
  height: 11px;
  border: solid;
  border-width: 2px;
  border-color: ${props => props.theme.palette.primary.contrastText};
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
`;

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
      <CheckboxLabel>
        <CheckboxInput
          type="checkbox"
          tabIndex={tabIndex}
          checked={checked}
          defaultChecked={defaultChecked}
          required={required}
          disabled={disabled}
          onChange={onChange}
          {...inputProps}
        />
        <CheckboxBox checked={checked} />
        <CheckboxMark checked={checked} />
      </CheckboxLabel>
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
