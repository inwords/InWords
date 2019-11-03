import styled from '@emotion/styled';
import isPropValid from '@emotion/is-prop-valid';
import { css } from '@emotion/core';

const variants = {
  h1: css`
    font-size: 6rem;
    font-weight: 300;
    line-height: 1;
  `,
  h2: css`
    font-size: 3.75rem;
    font-weight: 300;
    line-height: 1;
  `,
  h3: css`
    font-size: 3rem;
    font-weight: 400;
    line-height: 1.04;
  `,
  h4: css`
    font-size: 2.125rem;
    font-weight: 400;
    line-height: 1.17;
  `,
  h5: css`
    font-size: 1.5rem;
    font-weight: 400;
    line-height: 1.33;
  `,
  h6: css`
    font-size: 1.25rem;
    font-weight: 500;
    line-height: 1.6;
  `,
  body1: css`
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
  `,
  body2: css`
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.43;
  `
};

const Typography = styled('span', {
  shouldForwardProp: prop =>
    isPropValid(prop) && prop !== 'variant' && prop !== 'color'
})`
  margin: 0;
  color: ${props => props.theme.palette.text[props.color || 'primary']};
  ${props => variants[props.variant || 'body1'] || ''}
`;

export default Typography;
