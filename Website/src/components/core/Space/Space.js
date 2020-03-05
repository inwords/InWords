import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Space.scss';

function Space({ value = 'auto', className, ...rest }) {
  return <span className={classNames(`space-${value}`, className)} {...rest} />;
}

Space.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};

export default Space;
