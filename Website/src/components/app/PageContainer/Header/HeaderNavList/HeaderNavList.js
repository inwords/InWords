import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import ButtonBase from 'src/components/core/ButtonBase';

import './HeaderNavList.scss';

function HeaderNavList({ routes }) {
  return (
    <ul className="header-nav-list">
      {routes.map(({ to, text }) => (
        <li key={to} className="header-nav-list__item">
          <ButtonBase
            component={NavLink}
            to={to}
            className="header-nav-list__link"
            activeClassName="active"
          >
            {text}
          </ButtonBase>
        </li>
      ))}
    </ul>
  );
}

HeaderNavList.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

export default HeaderNavList;
