import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Menu.css';

function Menu({ component: Component = 'ul', className, ...rest }) {
  return <Component className={classNames('menu', className)} {...rest} />;
}

Menu.propTypes = {
  component: PropTypes.elementType,
  className: PropTypes.string
};

export default Menu;
