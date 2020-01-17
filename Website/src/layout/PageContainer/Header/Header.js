import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'src/components/Icon';
import IconButton from 'src/components/IconButton';
import BrandLink from 'src/layout/BrandLink';
import HeaderNavList from './HeaderNavList';
import APIProgress from './APIProgress';

import './Header.scss';

function Header({ routes, rightNodes, handleOpenDrawer }) {
  return (
    <header className="header">
      <div className="header__context">
        <div className="header__context-block">
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
          <BrandLink to="/">InWords</BrandLink>
        </div>
        {routes && (
          <nav role="navigation" className="header__nav">
            <HeaderNavList routes={routes} />
          </nav>
        )}
        {rightNodes && (
          <div className="header__context-block header__context-block--right">
            {rightNodes}
          </div>
        )}
      </div>
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
