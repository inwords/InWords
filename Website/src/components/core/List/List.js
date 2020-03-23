import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './List.css';

const List = React.forwardRef(function List(
  { component = 'ul', className, ...rest },
  ref
) {
  const Component = component;

  return (
    <Component ref={ref} className={classNames('list', className)} {...rest} />
  );
});

List.propTypes = {
  component: PropTypes.elementType,
  className: PropTypes.string
};

export default List;
