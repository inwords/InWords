import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import List from 'src/components/core/List';

import './SideNavList.scss';

function SideNavList({ routes, handleClose }) {
  return (
    <List className="side-nav-list">
      {routes.map(({ to, text }) => (
        <li key={to}>
          <NavLink
            to={to}
            onClick={handleClose}
            className="side-nav-list__link"
            activeClassName="active"
          >
            {text}
          </NavLink>
        </li>
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
  ).isRequired,
  handleClose: PropTypes.func
};

export default SideNavList;
