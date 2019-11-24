import React from 'react';
import PropTypes from 'prop-types';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { fade } from '@material-ui/core/styles';
import styled from '@emotion/styled';
import List from 'src/components/List';

const NavList = styled(List)`
  position: sticky;
  top: 0;
  padding-top: 88px;
  width: 240px;
`;

const NavListItem = styled.li`
  display: flex;
  padding: 0;
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  color: ${props => props.theme.palette.text.primary};
  transition: ${props =>
    props.theme.transitions.create('background-color', {
      duration: props.theme.transitions.duration.shortest
    })};
`;

const NavLink = styled(RouterNavLink)`
  margin: 0;
  padding: 10px 24px;
  width: 100%;
  font-weight: 400;
  text-decoration: none;
  color: ${props => props.theme.palette.text.primary};
  font-size: ${props => props.theme.typography.body1.fontSize};

  &:hover {
    background-color: ${props => props.theme.palette.action.hover};
  }

  &.active {
    font-weight: 500;
    color: ${props => props.theme.palette.primary.main};
    background-color: ${props => fade(props.theme.palette.primary.main, 0.15)};
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
