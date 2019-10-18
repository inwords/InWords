import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import classNames from 'classnames';
import Link from 'src/components/Link';

import './nav-list.scss';

function NavList({ children, vertical = false }) {
  return (
    <ul className={classNames('nav-list', { 'nav-list--vertical': vertical })}>
      {children}
      {/* <li className="nav-list__item">
        <Link
          component={RouterLink}
          to="/dictionary"
          className="nav-list__link"
        >
          Словарь
        </Link>
      </li>
      <li className="nav-list__item">
        <Link component={RouterLink} to="/trainings" className="nav-list__link">
          Обучение
        </Link>
      </li> */}
    </ul>
  );
}

NavList.propTypes = {
  children: PropTypes.node,
  vertical: PropTypes.bool
};

export default NavList;
