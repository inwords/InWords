import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from 'src/components/core/Toolbar';
import Space from 'src/components/core/Space';
import BrandLink from 'src/components/app-common/BrandLink';
import ControlledNavDrawer from './ControlledNavDrawer';
import HeaderNavList from './HeaderNavList';
import ApiProgress from './ApiProgress';

import './Header.scss';

function Header({ routes, rightNodes }) {
  return (
    <header className="header">
      <Toolbar className="header__toolbar">
        <div className="header__toolbar-block">
          {routes && (
            <ControlledNavDrawer
              routes={routes}
              className="header__nav-menu-button"
            />
          )}
          <BrandLink>InWords</BrandLink>
        </div>
        <Space />
        {routes && (
          <nav role="navigation" className="header__nav">
            <HeaderNavList routes={routes} />
          </nav>
        )}
        {rightNodes && (
          <div className="header__toolbar-block">{rightNodes}</div>
        )}
      </Toolbar>
      <ApiProgress />
    </header>
  );
}

Header.propTypes = {
  routes: PropTypes.array,
  rightNodes: PropTypes.arrayOf(PropTypes.node.isRequired)
};

export default Header;
