import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import './BreadcrumbsLink.scss';

function BreadcrumbsLink({ className, ...rest }) {
  return (
    <Link className={classNames('breadcrumbs-link', className)} {...rest} />
  );
}

export default BreadcrumbsLink;
