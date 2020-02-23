import React from 'react';
import classNames from 'classnames';

import './LinearProgress.scss';

function LinearProgress({ className, ...rest }) {
  return (
    <div
      role="progressbar"
      className={classNames('linear-progress', className)}
      {...rest}
    />
  );
}

export default LinearProgress;
