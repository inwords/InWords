import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './DialogContentText.scss';

function DialogContentText({ className, ...rest }) {
  return (
    <div className={classNames('dialog-content-text', className)} {...rest} />
  );
}

DialogContentText.propTypes = {
  className: PropTypes.string
};

export default DialogContentText;
