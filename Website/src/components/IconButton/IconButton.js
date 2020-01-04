import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './IconButton.scss';

function IconButton({
  component = 'button',
  color = 'default',
  edge,
  className,
  ...rest
}) {
  const Component = component;

  return (
    <Component
      className={classNames(
        'icon-button',
        `icon-button--color--${color}`,
        {
          [`icon-button--edge--${edge}`]: edge
        },
        className
      )}
      {...rest}
    />
  );
}

IconButton.propTypes = {
  component: PropTypes.elementType,
  color: PropTypes.string,
  edge: PropTypes.string
};

export default IconButton;
