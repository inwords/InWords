import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import classNames from 'classnames';

import './nav-bar.scss';

function NavBar() {
  return (
    <nav className="nav-bar">
      <div className="nav-bar__brand">
        <RouterLink to="/" className="nav-bar__brand-link">
          InWords
        </RouterLink>
      </div>
      <ui className="nav-bar__block nav-bar__menu-block">
        <li className="nav-bar__block-item menu-item">
          <RouterLink to="/dictionary" className="nav-bar__link">
            Словарь
          </RouterLink>
        </li>
        <li className="nav-bar__block-item menu-item">
          <RouterLink to="/trainings" className="nav-bar__link">
            Обучение
          </RouterLink>
        </li>
      </ui>
    </nav>
  );
}

NavBar.propTypes = {};

export default NavBar;
