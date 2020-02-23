import React from 'react';
import classNames from 'classnames';

import './Divider.css';

function Divider({ className, ...rest }) {
  return <hr className={classNames('divider', className)} {...rest} />;
}

export default Divider;
