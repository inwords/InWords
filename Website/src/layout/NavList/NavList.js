import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import classNames from 'classnames';
import Link from 'src/components/Link';

import './nav-list.scss';

function NavList({ vertical = false }) {
  return (
    <ul className={classNames('nav-list', { 'nav-list--vertical': vertical })}>
      <li className="nav-list__item">
        <Link
          component={RouterLink}
          to="/dictionary"
          className={classNames('nav-list__link', {
            'nav-list__link--vertical': vertical
          })}
        >
          Словарь
        </Link>
      </li>
      <li className="nav-list__item">
        <Link
          component={RouterLink}
          to="/trainings"
          className={classNames('nav-list__link', {
            'nav-list__link--vertical': vertical
          })}
        >
          Обучение
        </Link>
      </li>
    </ul>
  );
}

NavList.propTypes = {
  vertical: PropTypes.bool
};

export default NavList;
