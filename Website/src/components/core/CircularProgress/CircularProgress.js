import React from 'react';
import classNames from 'classnames';

import './CircularProgress.css';

function CircularProgress({ className, ...rest }) {
  return (
    <div
      role="progressbar"
      className={classNames('circular-progress', className)}
      {...rest}
    />
  );
}

export default CircularProgress;
