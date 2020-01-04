import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './List.css';

function List({ component = 'ul', className, ...rest }) {
  const Component = component;

  return <Component className={classNames('list', className)} {...rest} />;
}

List.propTypes = {
  component: PropTypes.elementType
};

export default List;
