import styled from '@emotion/styled';

const TextFieldInput = styled.input`
  display: block;
  border: 1px solid ${props => props.theme.palette.divider};
  border-radius: 0;
  width: ${props => (props.fullWidth ? '100%' : 'auto')};
  padding: 14px 12px;
  font: inherit;
  color: ${props => props.theme.palette.text.primary};
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
    border-color: ${props => props.theme.palette.text.primary};
  }

  &:focus {
    outline: 2px solid ${props => props.theme.palette.primary.main};
    outline-offset: -2px;
    border-color: ${props => props.theme.palette.primary.main};
  }

  &:disabled {
    pointer-events: none;
    color: ${props => props.theme.palette.text.disabled};
    border-color: ${props => props.theme.palette.disabled};
    background-color: ${props => props.theme.palette.disabled};
  }
`;

export default TextFieldInput;
