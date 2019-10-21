import styled from '@emotion/styled';

const TextFieldLabel = styled.label`
  position: absolute;
  left: 10px;
  top: 15px;
  padding: 0 4px;
  color: ${props =>
    props.disabled
      ? props.theme.palette.text.disabled
      : props.active
      ? props.theme.palette.primary.main
      : props.theme.palette.text.secondary};
  background-color: ${props =>
    props.compact ? props.theme.palette.background.paper : 'inherit'};
  font: inherit;
  pointer-events: none;
  transform: ${props =>
    props.compact ? 'translate(0, -21px) scale(0.75)' : 'none'};
  transform-origin: top left;
  transition: all 0.15s ease;

  &::after {
    content: ${props => (props.required ? "'*'" : 'none')};
    margin-left: 3px;
  }
`;

export default TextFieldLabel;
