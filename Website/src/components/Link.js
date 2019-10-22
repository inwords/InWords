import styled from '@emotion/styled';
import Typography from './Typography';

const Link = styled(Typography.withComponent('a'))`
  text-decoration: none;
  color: ${props => props.theme.palette.primary.main};

  &:hover {
    text-decoration: underline;
  }
`;

export default Link;
