/** @jsx jsx */
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import ButtonBase from 'src/components/ButtonBase';

const standartColorStyles = props => css`
  border: 1px solid rgb(138, 136, 134);
  color: ${props.theme.palette.text.primary};
  background-color: transparent;

  &:active,
  &:hover {
    background-color: rgb(243, 242, 241);
    @media (hover: none) {
      background-color: transparent;
    }
  }
`;

const primaryColorStyles = props => css`
  border: 0;
  color: ${props.theme.palette.primary.contrastText};
  background-color: ${props.theme.palette.primary.main};

  &:active,
  &:hover {
    background-color: ${props.theme.palette.primary.dark};
    @media (hover: none) {
      background-color: transparent;
    }
  }
`;

const Button = styled(ButtonBase)`
  min-width: ${props =>
    props.fullWidth ? '100%' : props.large ? '110px' : '80px'};
  border-radius: 2px;
  padding: 0 16px;
  outline: 2px solid transparent;
  outline-offset: -2px;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  transition: background-color 0.2s ease-in-out;
  height: ${props => (props.large ? 40 : 32)}px;

  &:disabled,
  &.disabled {
    cursor: default;
    pointer-events: none;
    color: ${props => props.theme.palette.action.disabled};
    border-color: ${props => props.theme.palette.action.disabled};
    background-color: ${props =>
      props.primary
        ? props.theme.palette.action.disabledBackground
        : 'transparent'};
  }

  ${props => (props.primary ? primaryColorStyles : standartColorStyles)}
`;

export default Button;
