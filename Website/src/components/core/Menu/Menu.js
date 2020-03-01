import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Menu.css';

function Menu({ component = 'ul', className, ...rest }) {
  const Component = component;

  return <Component className={classNames('menu', className)} {...rest} />;
}

Menu.propTypes = {
  component: PropTypes.elementType
};

export default Menu;
