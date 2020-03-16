import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './PopupContainer.css';

function PopupContainer({ className, ...rest }) {
  return <div className={classNames('popup-container', className)} {...rest} />;
}

PopupContainer.propTypes = {
  className: PropTypes.string
};

export default PopupContainer;
