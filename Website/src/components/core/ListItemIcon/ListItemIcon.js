import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './ListItemIcon.css';

function ListItemIcon({ className, ...rest }) {
  return <div className={classNames('list-item-icon', className)} {...rest} />;
}

ListItemIcon.propTypes = {
  className: PropTypes.string
};

export default ListItemIcon;
