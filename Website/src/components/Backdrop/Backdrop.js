import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Backdrop.scss';

function Backdrop({
  open = false,
  transitionDuration = 0,
  className,
  ...rest
}) {
  return (
    <div
      className={classNames('backdrop', className)}
      style={{
        opacity: open ? 1 : 0,
        transitionDuration: `${transitionDuration}ms`
      }}
      {...rest}
    />
  );
}

Backdrop.propTypes = {
  open: PropTypes.bool,
  transitionDuration: PropTypes.number
};

export default Backdrop;
