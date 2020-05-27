import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Header from './Header';

import './PageContainer.scss';

function PageContainer({ routes, rightNodes, children }) {
  return (
    <div className="page-container">
      <Header routes={routes} rightNodes={rightNodes} />
      <main className={classNames('page-container__main')}>{children}</main>
    </div>
  );
}

PageContainer.propTypes = {
  routes: PropTypes.array,
  rightNodes: PropTypes.array,
  children: PropTypes.node
};

export default PageContainer;
