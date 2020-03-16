import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './DialogActions.scss';

function DialogActions({ className, ...rest }) {
  return <div className={classNames('dialog-actions', className)} {...rest} />;
}

DialogActions.propTypes = {
  className: PropTypes.string
};

export default DialogActions;
