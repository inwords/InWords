import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import useDrawer from 'src/hooks/useDrawer';
import Drawer from 'src/components/Drawer';
import Divider from 'src/components/Divider';
import BrandLink from 'src/layout/BrandLink';
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
          <BrandLink
            onClick={event => {
              event.preventDefault();
              handleClose();
            }}
            to="/"
            className="page-container__drawer-brand-link"
          >
            InWords
          </BrandLink>
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
