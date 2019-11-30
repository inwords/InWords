import { fade } from '@material-ui/core/styles';
/** @jsx jsx */
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import isPropValid from '@emotion/is-prop-valid';
import ButtonBase from 'src/components/ButtonBase';

const defaultColorStyles = props => css`
  color: ${props.theme.palette.action.active};

  &:hover {
    background-color: ${props.theme.palette.action.hover};
    @media (hover: none) {
      background-color: transparent;
    }
  }
`;

const primaryColorStyles = props => css`
  color: ${props.theme.palette.primary.main};

  &:hover {
    background-color: ${fade(props.theme.palette.primary.main, 0.15)};
    @media (hover: none) {
      background-color: transparent;
    }
  }
`;

const secondaryColorStyles = props => css`
  color: ${props.theme.palette.secondary.main};

  &:hover {
    background-color: ${fade(props.theme.palette.secondary.main, 0.15)};
    @media (hover: none) {
      background-color: transparent;
    }
  }
`;

const errorColorStyles = props => css`
  color: ${props.theme.palette.error.main};

  &:hover {
    background-color: ${fade(props.theme.palette.error.main, 0.15)};
    @media (hover: none) {
      background-color: transparent;
    }
  }
`;

const inheritColorStyles = props => css`
  color: inherit;

  &:hover {
    background-color: ${props.theme.palette.action.hover};
    @media (hover: none) {
      background-color: transparent;
    }
  }
`;

const IconButton = styled(ButtonBase, {
  shouldForwardProp: prop => isPropValid(prop) && prop !== 'color'
})`
  border: 0;
  outline: 0;
  padding: 12px;
  font-size: ${props => props.theme.typography.pxToRem(24)};
  border-radius: 50%;
  background-color: transparent;
  transition: ${props =>
    props.theme.transitions.create('background-color', {
      duration: props.theme.transitions.duration.shortest
    })};

  ${props => {
    switch (props.color) {
      case 'primary':
        return primaryColorStyles;
      case 'secondary':
        return secondaryColorStyles;
      case 'error':
        return errorColorStyles;
      case 'inherit':
        return inheritColorStyles;
      default:
        return defaultColorStyles;
    }
  }}

  ${props => {
    switch (props.edge) {
      case 'start':
        return 'margin-left: -12px;';
      case 'end':
        return 'margin-right: -12px;';
      default:
    }
  }}

  &:disabled,
  &.disabled {
    color: ${props => props.theme.palette.action.disabled};
    background-color: transparent;
    cursor: default;
  }
`;

export default IconButton;
