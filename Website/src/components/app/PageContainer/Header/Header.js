import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import BrandLink from 'src/components/app-common/BrandLink';
import ControlledNavDrawer from './ControlledNavDrawer';
import HeaderNavList from './HeaderNavList';
import ApiProgress from './ApiProgress';

import './Header.scss';

function Header({ routes, rightNodes }) {
  return (
    <header className="header">
      <div
        className={classNames('header__toolbar', {
          'header__toolbar--has-nav': routes
        })}
      >
        <div className="header__left-nodes">
          {routes && (
            <ControlledNavDrawer
              routes={routes}
              className="header__nav-menu-button"
            />
          )}
          <BrandLink>InWords</BrandLink>
        </div>
        {routes && (
          <nav role="navigation" className="header__nav">
            <HeaderNavList routes={routes} />
          </nav>
        )}
        {rightNodes && <div className="header__right-nodes">{rightNodes}</div>}
      </div>
      <ApiProgress />
    </header>
  );
}

Header.propTypes = {
  routes: PropTypes.array,
  rightNodes: PropTypes.arrayOf(PropTypes.node.isRequired).isRequired
};

export default Header;
