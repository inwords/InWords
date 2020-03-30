import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import Header from './Header';
import SideNavList from './SideNavList';

import './PageContainer.scss';

function PageContainer({ routes, rightNodes, children }) {
  const { pathname } = useLocation();

  const route = routes && routes.find(({ to }) => pathname.startsWith(to));
  const nestedRoutes = route && route.nestedRoutes;

  return (
    <div className="page-container">
      <Header routes={routes} rightNodes={rightNodes} />
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
