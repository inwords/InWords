import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import useDrawer from 'src/hooks/useDrawer';
import Drawer from 'src/components/Drawer';
import Divider from 'src/components/Divider';
import Icon from 'src/components/Icon';
import IconButton from 'src/components/IconButton';
import BrandLink from 'src/templates/BrandLink';
import Header from './Header';
import DrawerNavList from './DrawerNavList';
import SideNavList from './SideNavList';

import './PageContainer.scss';

function getNestedRoutes(routes, pathname) {
  const route = routes && routes.find(({ to }) => pathname.startsWith(to));
  return route && route.nestedRoutes;
}

function PageContainer({ routes, rightNodes, children }) {
  const { open, handleOpen, handleClose } = useDrawer();

  const { pathname } = useLocation();

  const nestedRoutes = getNestedRoutes(routes, pathname);

  return (
    <div className="page-container">
      <Header
        routes={routes}
        rightNodes={rightNodes}
        handleOpenDrawer={routes && handleOpen}
      />
      {routes && (
        <Drawer
          className="page-container__drawer"
          role="navigation"
          open={open}
          onClose={handleClose}
        >
          <div className="page-container__drawer-header">
            <IconButton
              aria-label="side-nav-menu"
              onClick={handleClose}
              edge="start"
              color="inherit"
              className="page-container__drawer-header-menu-button"
            >
              <Icon>menu</Icon>
            </IconButton>
            <BrandLink>InWords</BrandLink>
          </div>
          <Divider />
          <DrawerNavList handleClose={handleClose} routes={routes} />
        </Drawer>
      )}
      {nestedRoutes && (
        <nav className="page-container__side-nav">
          <SideNavList routes={nestedRoutes} />
        </nav>
      )}
      <main
        className={classNames('page-container__main', {
          'page-container__main--with-nav': nestedRoutes
        })}
      >
        {children}
      </main>
    </div>
  );
}

PageContainer.propTypes = {
  routes: PropTypes.array,
  rightNodes: PropTypes.array,
  children: PropTypes.node
};

export default PageContainer;
