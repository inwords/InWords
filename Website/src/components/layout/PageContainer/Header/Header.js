import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from 'src/components/core/Toolbar';
import Icon from 'src/components/core/Icon';
import IconButton from 'src/components/core/IconButton';
import Space from 'src/components/core/Space';
import BrandLink from '../BrandLink';
import HeaderNavList from './HeaderNavList';
import ApiProgress from './ApiProgress';

import './Header.scss';

function Header({ routes, rightNodes, handleOpenDrawer }) {
  return (
    <header className="header">
      <Toolbar>
        <div className="header__toolbar-block">
          {handleOpenDrawer && (
            <IconButton
              aria-label="side-nav-menu"
              onClick={handleOpenDrawer}
              edge="start"
              color="inherit"
              className="header__nav-menu-button"
            >
              <Icon>menu</Icon>
            </IconButton>
          )}
          <BrandLink>InWords</BrandLink>
        </div>
        <Space />
        {routes && (
          <nav role="navigation" className="header__nav">
            <HeaderNavList routes={routes} />
          </nav>
        )}
        <Space value={8} />
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
  rightNodes: PropTypes.arrayOf(PropTypes.node.isRequired),
  handleOpenDrawer: PropTypes.func
};

export default Header;
