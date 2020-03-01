import React from 'react';
import classNames from 'classnames';

import './BrandLink.css';

function BrandLink({ className, ...rest }) {
  return (
    <a className={classNames('iw-brand-link', className)} href="/" {...rest} />
  );
}

export default BrandLink;
