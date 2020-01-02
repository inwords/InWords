import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import './BrandLink.css';

function BrandLink({ className, ...rest }) {
  return <Link className={classNames('iw-brand-link', className)} {...rest} />;
}

export default BrandLink;
