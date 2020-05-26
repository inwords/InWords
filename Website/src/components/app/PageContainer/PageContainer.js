import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Header from './Header';

import './PageContainer.scss';

function PageContainer({ routes, authorized, children }) {
  return (
    <div className="page-container">
      <Header routes={routes} authorized={authorized} />
      <main className={classNames('page-container__main')}>{children}</main>
    </div>
  );
}

PageContainer.propTypes = {
  routes: PropTypes.array,
  authorized: PropTypes.bool,
  children: PropTypes.node
};

export default PageContainer;
