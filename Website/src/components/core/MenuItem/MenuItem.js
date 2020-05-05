import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './MenuItem.scss';

function MenuItem({ component: Component = 'div', className, ...rest }) {
  return <Component className={classNames('menu-item', className)} {...rest} />;
}

MenuItem.propTypes = {
  component: PropTypes.elementType,
  className: PropTypes.string
};

export default MenuItem;
