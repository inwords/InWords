import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './DialogContent.css';

function DialogContent({ className, ...rest }) {
  return <div className={classNames('dialog-content', className)} {...rest} />;
}

DialogContent.propTypes = {
  className: PropTypes.string
};

export default DialogContent;
