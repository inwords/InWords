import React from 'react';
import PropTypes from 'prop-types';
import { NavLink as RouterNavLink } from 'react-router-dom';
import styled from '@emotion/styled';
import ListItemButton from 'src/components/ListItemButton';
import List from 'src/components/List';

const NavList = styled(List)`
  position: sticky;
  top: 88px;
`;

const NavListItem = styled(ListItemButton)`
  padding: 0;
`;

const NavLink = styled(RouterNavLink)`
  margin: 0;
  padding: 10px 24px;
  width: 100%;
  font-weight: 400;
  text-decoration: none;
  color: ${props => props.theme.palette.text.primary};
  &.active {
    font-weight: 500;
    color: ${props => props.theme.palette.primary.main};
  }
`;

function SideNavList({ routes, handleClose }) {
  return (
    <NavList>
      {routes.map(({ to, text }) => (
        <NavListItem key={to} as="li" button onClick={handleClose}>
          <NavLink to={to} activeClassName="active">
            {text}
          </NavLink>
        </NavListItem>
      ))}
    </NavList>
  );
}

SideNavList.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  )
};

export default SideNavList;
