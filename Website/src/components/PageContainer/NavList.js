import React from 'react';
import PropTypes from 'prop-types';
import { NavLink as RouterNavLink } from 'react-router-dom';
import styled from '@emotion/styled';
import List from 'src/components/List';
import ListItemButtonBase from 'src/components/ListItemButtonBase';

const NavListRoot = styled(List)`
  padding-top: 16px;
`;

const NavLinkBase = styled(ListItemButtonBase)`
  position: relative;
  width: 100%;
  color: ${props => props.theme.palette.text.primary};
  transition: ${props =>
    props.theme.transitions.create(['background-color', 'color'], {
      duration: props.theme.transitions.duration.shortest
    })};

  &:hover,
  &.active {
    color: ${props => props.theme.palette.primary.main};
  }

  &.active {
    font-weight: 500;
  }
`;

const NestedNavList = styled(List)`
  width: 100%;
`;

const NavLink = styled(NavLinkBase)`
  padding: 10px 24px;
  ${props => props.theme.typography.body1};
`;

const NestedNavLink = styled(NavLinkBase)`
  padding: 4px 36px;
  ${props => props.theme.typography.body2};

  &.active::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 2px;
    background-color: ${props => props.theme.palette.primary.main};
  }
`;

function NavList({ routes, handleClose }) {
  return (
    <NavListRoot>
      {routes.map(({ to, text, nestedRoutes }) => (
        <li key={to}>
          <NavLink
            as={RouterNavLink}
            to={to}
            onClick={handleClose}
            activeClassName="active"
          >
            {text}
          </NavLink>
          {nestedRoutes && (
            <NestedNavList>
              {nestedRoutes.map(({ to, text, nestedRoutes }) => (
                <li key={to}>
                  <NestedNavLink
                    as={RouterNavLink}
                    to={to}
                    onClick={handleClose}
                    activeClassName="active"
                  >
                    {text}
                  </NestedNavLink>
                </li>
              ))}
            </NestedNavList>
          )}
        </li>
      ))}
    </NavListRoot>
  );
}

NavList.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ),
  handleClose: PropTypes.func.isRequired
};

export default NavList;
