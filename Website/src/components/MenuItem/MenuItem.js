import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './MenuItem.scss';

function MenuItem({ component, className, ...rest }) {
  const Component = component;

  return <Component className={classNames('menu-item', className)} {...rest} />;
}

MenuItem.propTypes = {
  component: PropTypes.elementType
};

export default MenuItem;
