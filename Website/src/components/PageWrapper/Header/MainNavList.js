import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { NavLink as RouterNavLink } from 'react-router-dom';

const NavList = styled.ul`
  margin: 0;
  display: flex;
  justify-content: space-around;
  padding: 0;
  list-style: none;
  width: 100%;
  height: 100%;
`;

const NavListItem = styled.li`
  display: flex;
  justify-content: center;
  flex: 1;
  height: 100%;
`;

const NavLink = styled(RouterNavLink)`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 14px;
  font-size: 1rem;
  height: 100%;
  text-decoration: none;
  color: ${props => props.theme.palette.grey[400]};
  transition: color 0.1s cubic-bezier(0.4, 0, 0.2, 1);
  &:hover {
    color: ${props => props.theme.palette.primary.contrastText};
  }
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 14px;
    right: 14px;
    height: 4px;
    background-color: ${props => props.theme.palette.primary.contrastText};
    transform: scaleY(0);
    transition: transform 235ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  &.active {
    color: ${props => props.theme.palette.primary.contrastText};
    &::after {
      transform: scaleY(1);
    }
  }
`;

function MainNavList({ show, mainRoutes, handleOpenDrawer }) {
  return (
    <NavList>
      {mainRoutes.map(({ to, text }) => (
        <NavListItem key={to}>
          <NavLink to={to} activeClassName="active">
            {text}
          </NavLink>
        </NavListItem>
      ))}
    </NavList>
  );
}

MainNavList.propTypes = {
  mainRoutes: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

export default MainNavList;
