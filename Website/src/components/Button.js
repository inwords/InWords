import styled from '@emotion/styled';

const Button = styled.button`
  position: relative;
  display: inline-block;
  border: 2px solid transparent;
  min-width: ${props => (props.fullWidth ? '100%' : '120px')};
  padding: 9px 12px;
  outline: 2px solid transparent;
  outline-offset: -2px;
  text-align: center;
  text-decoration: none;
  line-height: 1;
  font-size: 1rem;
  font-weight: 500;
  user-select: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  color: ${props =>
    props.primary
      ? props.theme.palette.primary.contrastText
      : props.theme.palette.default.contrastText};
  background-color: ${props =>
    props.primary
      ? props.theme.palette.primary.main
      : props.theme.palette.default.main};

  &:focus {
    outline-color: #000;
  }

  &:hover {
    border-color: ${props =>
      props.primary
        ? props.theme.palette.primary.dark
        : props.theme.palette.default.dark};
  }

  &:active {
    background-color: ${props =>
      props.primary
        ? props.theme.palette.primary.dark
        : props.theme.palette.default.dark};
    transform: scale(0.98);
  }

  :disabled {
    pointer-events: none;
    color: ${props => props.theme.palette.text.disabled};
    background-color: ${props => props.theme.palette.disabled};
  }

  &::before {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    content: '';
    border: 1px solid transparent;
    transition: all 0.2s ease-in-out;
  }

  &:focus::before {
    border-color: rgba(255, 255, 255, 0.6);
  }
`;

export default Button;
