import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './ListItemContainer.css';

function ListItemContainer({ className, ...rest }) {
  return (
    <li className={classNames('list-item-container', className)} {...rest} />
  );
}

ListItemContainer.propTypes = {
  className: PropTypes.string
};

export default ListItemContainer;
