import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './BreadcrumbsLink.scss';

function BreadcrumbsLink({ className, ...rest }) {
  return (
    <Link className={classNames('breadcrumbs-link', className)} {...rest} />
  );
}

BreadcrumbsLink.propTypes = {
  className: PropTypes.string
};

export default BreadcrumbsLink;
