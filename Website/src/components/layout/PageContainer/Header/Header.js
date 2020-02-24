import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from 'src/components/core/Toolbar';
import Icon from 'src/components/core/Icon';
import IconButton from 'src/components/core/IconButton';
import BrandLink from '../BrandLink';
import HeaderNavList from './HeaderNavList';
import APIProgress from './APIProgress';

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
        {routes && (
          <nav role="navigation" className="header__nav">
            <HeaderNavList routes={routes} />
          </nav>
        )}
        {rightNodes && (
          <div className="header__toolbar-block header__toolbar-block--right">
            {rightNodes}
          </div>
        )}
      </Toolbar>
      <APIProgress />
    </header>
  );
}

Header.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ),
  rightNodes: PropTypes.arrayOf(PropTypes.node.isRequired),
  handleOpenDrawer: PropTypes.func
};

export default Header;
