import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './GridItem.scss';

function GridItem({
  xs = false,
  sm = false,
  md = false,
  lg = false,
  xl = false,
  className,
  ...rest
}) {
  return (
    <div
      className={classNames(
        'grid-item',
        {
          [`grid-item--xs--${xs}`]: xs,
          [`grid-item--sm--${sm}`]: sm,
          [`grid-item--md--${md}`]: md,
          [`grid-item--lg--${lg}`]: lg,
          [`grid-item--xl--${xl}`]: xl
        },
        className
      )}
      {...rest}
    />
  );
}

GridItem.propTypes = {
  xs: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  sm: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  md: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  lg: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  xl: PropTypes.oneOfType([PropTypes.number, PropTypes.bool])
};

export default GridItem;
