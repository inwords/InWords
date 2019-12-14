import React from 'react';
import styled from '@emotion/styled';
import Typography from 'src/components/Typography';

const LinkRoot = styled(Typography)`
  cursor: pointer;
  text-decoration: none;

  &:hover,
  &:active {
    text-decoration: underline;
  }
`;

const Link = props => <LinkRoot as="a" color="primary" {...props} />;

export default Link;
