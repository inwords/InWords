import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Grid.scss';

function Grid({ spacing = 0, className, ...rest }) {
  return (
    <div
      className={classNames(
        'grid',
        {
          [`grid--spacing--${spacing}`]: spacing !== 0
        },
        className
      )}
      {...rest}
    />
  );
}

Grid.propTypes = {
  spacing: PropTypes.number
};

export default Grid;
