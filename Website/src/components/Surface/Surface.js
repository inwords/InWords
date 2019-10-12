import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './surface.scss';

const Surface = React.forwardRef(function Surface(props, ref) {
  const { component = 'div', children, className, ...rest } = props;

  const ComponentProp = component;

  return (
    <ComponentProp
      ref={ref}
      className={classNames('surface', {
        [className]: Boolean(className)
      })}
      {...rest}
    >
      {children}
    </ComponentProp>
  );
});

Surface.propTypes = {
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  children: PropTypes.node,
  className: PropTypes.string
};

export default Surface;
