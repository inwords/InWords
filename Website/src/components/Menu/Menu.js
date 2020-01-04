import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Menu.css';

function Menu({ component = 'ul', onClick, className, ...rest }) {
  const Component = component;

  const handleClick = event => {
    event.stopPropagation();

    if (onClick) {
      onClick(event);
    }
  };

  return (
    <Component
      className={classNames('menu', className)}
      onClick={handleClick}
      {...rest}
    />
  );
}

Menu.propTypes = {
  component: PropTypes.elementType,
  onClick: PropTypes.func
};

export default Menu;
