import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './ListItem.scss';

function ListItem({
  component = 'li',
  button = false,
  hasSecondaryAction,
  className,
  ...rest
}) {
  const Component = component;
  const listItemProps = {};

  if (button) {
    listItemProps.role = 'button';
  }

  return (
    <Component
      className={classNames(
        'list-item',
        {
          'list-item--button': button,
          'list-item--secondary-action': hasSecondaryAction
        },
        className
      )}
      {...listItemProps}
      {...rest}
    />
  );
}

ListItem.propTypes = {
  component: PropTypes.elementType,
  button: PropTypes.bool,
  hasSecondaryAction: PropTypes.bool
};

export default ListItem;
