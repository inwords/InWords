import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Grid.scss';

function Grid({
  spacing = 0,
  direction = 'row',
  alignItems = 'stretch',
  justify = 'flex-start',
  wrap = 'wrap',
  className,
  ...rest
}) {
  return (
    <div
      className={classNames(
        'grid',
        {
          [`grid--spacing--${spacing}`]: spacing !== 0,
          [`grid--direction--${direction}`]: direction !== 'row',
          [`grid--align-items--${alignItems}`]: alignItems !== 'stretch',
          [`grid--justify--${justify}`]: justify !== 'flex-start',
          [`grid--wrap--${wrap}`]: wrap !== 'wrap'
        },
        className
      )}
      {...rest}
    />
  );
}

Grid.propTypes = {
  spacing: PropTypes.number,
  direction: PropTypes.string,
  alignItems: PropTypes.string,
  justify: PropTypes.string,
  wrap: PropTypes.string
};

export default Grid;
