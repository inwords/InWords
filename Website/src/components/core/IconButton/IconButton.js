import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ButtonBase from 'src/components/core/ButtonBase';

import './IconButton.scss';

function IconButton({ color = 'default', edge, className, ...rest }) {
  return (
    <ButtonBase
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
  color: PropTypes.string,
  edge: PropTypes.string
};

export default IconButton;
