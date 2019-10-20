import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import classNames from 'classnames';
import Icon from 'src/components/Icon';

import Button from 'src/components/Button';
import ButtonBase from 'src/components/ButtonBase';
import NavList from 'src/layout/NavList';
import NavListItem from 'src/layout/NavListItem';
import Drawer from 'src/layout/Drawer';

import './nav-bar.scss';

const navListItems = [
  <NavListItem to="/dictionary">Словарь</NavListItem>,
  <NavListItem to="/trainings">Обучение</NavListItem>
];

const IconButton = React.forwardRef(function Icon(props, ref) {
  const { children, primary, className, ...rest } = props;

  return (
    <ButtonBase
      className={classNames('icon-button', {
        'icon-button--primary': primary,
        [className]: Boolean(className)
      })}
      ref={ref}
      {...rest}
    >
      {children}
    </ButtonBase>
  );
});

function NavMenu({ handleToggle }) {
  return (
    <nav className="nav-bar">
      <div className="nav-bar__brand">
        <RouterLink to="/" className="nav-bar__brand-link">
          InWords
        </RouterLink>
      </div>
      <ui className="nav-bar__block nav-bar__block-menu">
        <li className="nav-bar__block--item nav-bar__menu-item">
          <RouterLink to="/dictionary" className="nav-bar__link">
            Словарь
          </RouterLink>
        </li>
        <li className="nav-bar__block--item nav-bar__menu-item">
          <RouterLink to="/trainings" className="nav-bar__link">
            Обучение
          </RouterLink>
        </li>
      </ui>
      <div className="nav-bar__block nav-bar__block-menu-icon">
        <div className="nav-bar__block--item nav-bar__block--icon">
          <IconButton onClick={handleToggle} primary>
            <Icon name="menu" />
          </IconButton>
        </div>
      </div>
    </nav>
  );
}

NavMenu.propTypes = {};

export default NavMenu;
