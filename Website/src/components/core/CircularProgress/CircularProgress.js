import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './CircularProgress.scss';

function CircularProgress({ className, ...rest }) {
  return (
    <div
      role="progressbar"
      className={classNames('circular-progress', className)}
      {...rest}
    >
      <svg viewBox="22 22 44 44" className="circular-progress__svg">
        <circle
          cx="44"
          cy="44"
          r="20.2"
          strokeWidth="3.6"
          fill="none"
          className="circular-progress__circle"
        />
      </svg>
    </div>
  );
}

CircularProgress.propTypes = {
  className: PropTypes.string
};

export default CircularProgress;
