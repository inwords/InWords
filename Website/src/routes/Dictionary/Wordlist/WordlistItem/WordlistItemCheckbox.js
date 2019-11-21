import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const CheckboxRoot = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 12px;
  border-radius: 50%;
  cursor: pointer;
  transition: ${props =>
    props.theme.transitions.create('background-color', {
      duration: props.theme.transitions.duration.shortest
    })};

  &:hover {
    background-color: ${props => props.theme.palette.action.hover};
  }
`;

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
  border: solid};
  border-width: 2px;
  border-radius: 2px;
  border-color: ${props =>
    props.checked
      ? props.theme.palette.primary.main
      : props.theme.palette.action.active};
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
  border: 2px solid ${props => props.theme.palette.primary.contrastText};
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
`;

function WordlistItemCheckbox({ checked, inputProps, ...rest }) {
  return (
    <CheckboxRoot>
      <CheckboxLabel>
        <CheckboxInput
          type="checkbox"
          checked={checked}
          {...inputProps}
          {...rest}
        />
        <CheckboxBox checked={checked} />
        <CheckboxMark checked={checked} />
      </CheckboxLabel>
    </CheckboxRoot>
  );
}

WordlistItemCheckbox.propTypes = {
  inputProps: PropTypes.object,
  checked: PropTypes.bool
};

export default React.memo(WordlistItemCheckbox);
