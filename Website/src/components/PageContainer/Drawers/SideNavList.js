import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { NavLink as RouterNavLink } from 'react-router-dom';
import styled from '@emotion/styled';
import List from 'src/components/List';
import Divider from 'src/components/Divider';

const NavListItem = styled.li`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  padding: ${props => (props.nested ? '0' : '6px 0 8px')};
  color: ${props => props.theme.palette.text.primary};
  transition: ${props =>
    props.theme.transitions.create('background-color', {
      duration: props.theme.transitions.duration.shortest
    })};
`;

const NavLinkBase = styled(RouterNavLink)`
  margin: 0;
  width: 100%;
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  color: ${props => props.theme.palette.text.primary};

  &:hover {
    background-color: ${props => props.theme.palette.action.hover};
  }

  &.active {
    font-weight: 500;
    color: ${props => props.theme.palette.primary.main};
  }
`;

const NestedNavList = styled(List)`
  width: 100%;
  padding-top: 4px;
`;

const NavLink = styled(NavLinkBase)`
  padding: 8px 24px;
  font-weight: 500;
  font-size: ${props => props.theme.typography.body1.fontSize};
`;

const NestedNavLink = styled(NavLink)`
  padding: 6px 24px;
  font-weight: 400;
  font-size: ${props => props.theme.typography.body2.fontSize};
`;

function SideNavList({ routes, handleClose }) {
  return (
    <List>
      {routes.map(({ to, text, nestedRoutes }) => (
        <Fragment key={to}>
          <NavListItem as="li">
            <NavLink to={to} onClick={handleClose} activeClassName="active">
              {text}
            </NavLink>
            {nestedRoutes && (
              <NestedNavList>
                {nestedRoutes.map(({ to, text, nestedRoutes }) => (
                  <NavListItem key={to} as="li" nested>
                    <NestedNavLink
                      to={to}
                      onClick={handleClose}
                      activeClassName="active"
                    >
                      {text}
                    </NestedNavLink>
                  </NavListItem>
                ))}
              </NestedNavList>
            )}
          </NavListItem>
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
