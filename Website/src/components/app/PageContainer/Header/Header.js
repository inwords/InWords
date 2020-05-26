import React from 'react';
import PropTypes from 'prop-types';
import BrandLink from 'src/components/app-common/BrandLink';
import ControlledNavDrawer from './ControlledNavDrawer';
import HeaderNavList from './HeaderNavList';
import ApiProgress from './ApiProgress';
import ControlledProfileMenu from './ControlledProfileMenu';

import './Header.scss';

function Header({ routes, authorized }) {
  return (
    <header className="header">
      <div className="header__toolbar">
        <div className="header__left-nodes">
          <ControlledNavDrawer
            routes={routes}
            className="header__nav-menu-button"
          />
          <BrandLink>InWords</BrandLink>
        </div>
        <nav role="navigation" className="header__nav">
          <HeaderNavList routes={routes} />
        </nav>
        {authorized && (
          <div className="header__right-nodes">
            <ControlledProfileMenu />
          </div>
        )}
      </div>
      <ApiProgress />
    </header>
  );
}

Header.propTypes = {
  routes: PropTypes.array,
  authorized: PropTypes.bool.isRequired
};

export default Header;
