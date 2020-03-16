import React from 'react';
import PropTypes from 'prop-types';
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

CircularProgress.propTypes = {
  className: PropTypes.string
};

export default CircularProgress;
