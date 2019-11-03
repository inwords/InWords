import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './icon.scss';

const Icon = React.forwardRef(function Icon(props, ref) {
  const { name, className, ...rest } = props;

  return (
    <i
      className={classNames('material-icons', {
        [className]: Boolean(className)
      })}
      ref={ref}
      {...rest}
    >
      {name}
    </i>
  );
});

Icon.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string
};

export default Icon;
