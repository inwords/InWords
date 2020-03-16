import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './BrandLink.css';

function BrandLink({ children, className, ...rest }) {
  return (
    <a className={classNames('iw-brand-link', className)} href="/" {...rest}>
      {children}
    </a>
  );
}

BrandLink.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default BrandLink;
