import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import './HeaderNavList.scss';

function HeaderNavList({ routes }) {
  const [active, setActive] = React.useState();

  const { pathname } = useLocation();

  React.useEffect(() => {
    setActive(
      routes.some(({ to }) => {
        return pathname.startsWith(to);
      })
    );
  }, [routes, pathname]);

  return (
    <ul
      className={classNames('header-nav-list', {
        'header-nav-list--active': active
      })}
    >
      {routes.map(({ to, text }) => (
        <li key={to} className="header-nav-list__item">
          <NavLink
            to={to}
            className="header-nav-list__link"
            activeClassName="active"
          >
            {text}
          </NavLink>
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
  )
};

export default HeaderNavList;
