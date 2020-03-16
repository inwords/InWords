import React from 'react';
import PropTypes from 'prop-types';
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

LinearProgress.propTypes = {
  className: PropTypes.string
};

export default LinearProgress;
