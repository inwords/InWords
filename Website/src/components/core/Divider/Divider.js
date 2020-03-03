import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Divider.css';

function Divider({ className, ...rest }) {
  return <hr className={classNames('divider', className)} {...rest} />;
}

Divider.propTypes = {
  className: PropTypes.string
};

export default Divider;
