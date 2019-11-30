import styled from '@emotion/styled';
/** @jsx jsx */
import { css } from '@emotion/core';

const colorPrimaryStyle = props => css`
  color: ${props.theme.palette.primary.main};
`;

const colorSecondaryStyle = props => css`
  color: ${props.theme.palette.secondary.main};
`;

const colorTextPrimaryStyle = props => css`
  color: ${props.theme.palette.text.primary};
`;

const colorTextSecondaryStyle = props => css`
  color: ${props.theme.palette.text.secondary};
`;

const Typography = styled.span`
  margin: 0;
  ${props => props.theme.typography[props.variant || 'body2']}
  ${props => {
    switch (props.color || 'textPrimary') {
      case 'primary':
        return colorPrimaryStyle;
      case 'secondary':
        return colorSecondaryStyle;
      case 'textPrimary':
        return colorTextPrimaryStyle;
      case 'textSecondary':
        return colorTextSecondaryStyle;
      default:
        return 'color: inherit';
    }
  }}
`;

export default Typography;
