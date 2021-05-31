import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ButtonBase from 'src/components/core/ButtonBase';

import './BreadcrumbsLink.scss';

function BreadcrumbsLink({ className, ...rest }) {
  return (
    <ButtonBase
      component={Link}
      className={classNames('breadcrumbs-link', className)}
      {...rest}
    />
  );
}

BreadcrumbsLink.propTypes = {
  className: PropTypes.string
};

export default BreadcrumbsLink;
