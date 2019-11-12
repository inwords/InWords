import React from 'react';
import PropTypes from 'prop-types';
import { NavLink as RouterNavLink } from 'react-router-dom';
import styled from '@emotion/styled';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const NavListItem = styled(ListItem)`
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

function SideNavList({ sideRoutes }) {
  return (
    <List>
      {sideRoutes.map(({ to, text }) => (
        <NavListItem key={to} component="li" button>
          <NavLink to={to} activeClassName="active">
            {text}
          </NavLink>
        </NavListItem>
      ))}
    </List>
  );
}

SideNavList.propTypes = {
  sideRoutes: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  )
};

export default SideNavList;
