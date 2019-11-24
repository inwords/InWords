import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { NavLink as RouterNavLink } from 'react-router-dom';
import styled from '@emotion/styled';
import ListItemButton from 'src/components/ListItemButton';
import List from 'src/components/List';
import Divider from 'src/components/Divider';

const NavListItemButton = styled(ListItemButton)`
  align-items: flex-start;
  flex-direction: column;
  padding: 6px 0;
`;

const NavLink = styled(RouterNavLink)`
  margin: 0;
  padding: 5px 24px;
  width: 100%;
  font-weight: 500;
  text-decoration: none;
  color: ${props => props.theme.palette.text.primary};
  &.active {
    font-weight: 500;
    color: ${props => props.theme.palette.primary.main};
  }
`;

const NestedNavList = styled(List)`
  width: 100%;
`;

const NestedNavLink = styled(NavLink)`
  font-weight: 400;
  font-size: 0.875rem;
  padding: 0 24px;
`;

function SideNavList({ routes, handleClose }) {
  return (
    <List>
      {routes.map(({ to, text, nestedRoutes }) => (
        <Fragment key={to}>
          <NavListItemButton as="li" onClick={handleClose}>
            <NavLink to={to} activeClassName="active">
              {text}
            </NavLink>
            {nestedRoutes && (
              <NestedNavList>
                {nestedRoutes.map(({ to, text, nestedRoutes }) => (
                  <NavListItemButton key={to} as="li" onClick={handleClose}>
                    <NestedNavLink to={to} activeClassName="active">
                      {text}
                    </NestedNavLink>
                  </NavListItemButton>
                ))}
              </NestedNavList>
            )}
          </NavListItemButton>
          <Divider />
        </Fragment>
      ))}
    </List>
  );
}

SideNavList.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ),
  handleClose: PropTypes.func.isRequired
};

export default SideNavList;
