import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './List.css';

const List = forwardRef(function List(
  { component: Component = 'ul', className, ...rest },
  ref
) {
  return (
    <Component ref={ref} className={classNames('list', className)} {...rest} />
  );
});

List.propTypes = {
  component: PropTypes.elementType,
  className: PropTypes.string
};

export default List;
