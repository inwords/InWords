import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Space.scss';

function Space({ x = 'auto', className, ...rest }) {
  return (
    <span
      className={classNames(
        {
          [`space-${x}`]: x
        },
        className
      )}
      {...rest}
    />
  );
}

Space.propTypes = {
  x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};

export default Space;
