import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './ListItemSecondaryAction.css';

function ListItemSecondaryAction({ className, ...rest }) {
  return (
    <div
      className={classNames('list-item-secondary-action', className)}
      {...rest}
    />
  );
}

ListItemSecondaryAction.propTypes = {
  className: PropTypes.string
};

export default ListItemSecondaryAction;
