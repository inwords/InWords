import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import List from 'src/components/core/List';

import './DrawerNavList.scss';

function DrawerNavList({ routes, handleClose }) {
  return (
    <List className="drawer-nav-list">
      {routes.map(({ to, text }) => (
        <li key={to}>
          <NavLink
            to={to}
            onClick={handleClose}
            className="drawer-nav-list__link"
            activeClassName="active"
          >
            {text}
          </NavLink>
        </li>
      ))}
    </List>
  );
}

DrawerNavList.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  handleClose: PropTypes.func.isRequired
};

export default DrawerNavList;
