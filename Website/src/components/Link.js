import styled from '@emotion/styled';

const Link = styled.a`
  display: inline-flex;
  cursor: pointer;
  text-decoration: none;
  color: ${props => props.theme.palette.primary.main};

  &:hover,
  &:active {
    text-decoration: underline;
  }
`;

export default Link;
