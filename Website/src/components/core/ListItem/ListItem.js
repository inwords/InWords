import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ButtonBase from 'src/components/core/ButtonBase';

import './ListItem.scss';

function ListItem({
  button = false,
  component: Component = button ? ButtonBase : 'li',
  hasSecondaryAction = false,
  className,
  ...rest
}) {
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
      {...rest}
    />
  );
}

ListItem.propTypes = {
  component: PropTypes.elementType,
  button: PropTypes.bool,
  hasSecondaryAction: PropTypes.bool,
  className: PropTypes.string
};

export default ListItem;
