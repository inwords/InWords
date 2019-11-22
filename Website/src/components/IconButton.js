import { fade } from '@material-ui/core/styles';
/** @jsx jsx */
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import isPropValid from '@emotion/is-prop-valid';
import ButtonBase from 'src/components/ButtonBase';

const defaultStyles = props => css`
  color: ${props.theme.palette.action.active};

  &:hover {
    background-color: ${props.theme.palette.action.hover};
  }
`;

const primaryStyles = props => css`
  color: ${props.theme.palette.primary.main};

  &:hover {
    background-color: ${fade(props.theme.palette.primary.main, 0.15)};
  }
`;

const secondaryStyles = props => css`
  color: ${props.theme.palette.secondary.main};

  &:hover {
    background-color: ${fade(props.theme.palette.secondary.main, 0.15)};
  }
`;

const IconButton = styled(ButtonBase, {
  shouldForwardProp: prop => isPropValid(prop) && prop !== 'color'
})`
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
        return primaryStyles;
      case 'secondary':
        return secondaryStyles;
      case 'inherit':
        return 'inherit';
      default:
        return defaultStyles;
    }
  }}

  &:hover: {
    @media (hover: none) {
      background-color: transparent;
    }
  }

  &:disabled,
  &.disabled {
    background-color: transparent;
    color: ${props => props.theme.palette.action.disabled};
  }
`;

export default IconButton;
