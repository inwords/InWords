import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const BreadcrumbsLink = styled(Link)`
  display: flex;
  padding-top: 0px;
  padding-right: 8px;
  padding-bottom: 0px;
  padding-left: 8px;
  line-height: 36px;
  font-size: 1rem;
  font-weight: 400;
  color: ${props => props.theme.palette.primary.main};
  text-decoration: none;

  &:hover {
    background-color: rgb(237, 235, 233);
    text-decoration: none;
  }
`;

export default BreadcrumbsLink;
