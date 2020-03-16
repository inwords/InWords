import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import useDrawer from 'src/hooks/useDrawer';
import Drawer from 'src/components/core/Drawer';
import Divider from 'src/components/core/Divider';
import Icon from 'src/components/core/Icon';
import IconButton from 'src/components/core/IconButton';
import Space from 'src/components/core/Space';
import BrandLink from './BrandLink';
import Header from './Header';
import DrawerNavList from './DrawerNavList';
import SideNavList from './SideNavList';

import './PageContainer.scss';

function PageContainer({ routes, rightNodes, children }) {
  const { open, handleOpen, handleClose } = useDrawer();

  const { pathname } = useLocation();

  const nestedRoutes = React.useMemo(() => {
    const route = routes && routes.find(({ to }) => pathname.startsWith(to));
    return route && route.nestedRoutes;
  }, [routes, pathname]);

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
            >
              <Icon>menu</Icon>
            </IconButton>
            <Space value={2} />
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
          'page-container__main--has-nav': nestedRoutes
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
