import { Link as RouterLink } from 'react-router-dom';
import styled from '@emotion/styled';

const BrandLink = styled(RouterLink)`
  display: flex;
  align-items: center;
  min-height: 64px;
  font-size: 1rem;
  font-weight: 500;
  text-transform: uppercase;
  text-decoration: none;
  color: inherit;
`;

export default BrandLink;
