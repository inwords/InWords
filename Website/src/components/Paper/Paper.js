import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './paper.scss';

const Paper = React.forwardRef(function Paper(props, ref) {
  const {
    component = 'div',
    children,
    elevation = 1,
    className,
    ...rest
  } = props;

  const ComponentProp = component;

  return (
    <ComponentProp
      ref={ref}
      className={classNames('paper', {
        [`paper--elevation-${elevation}`]: elevation > 0,
        [className]: Boolean(className)
      })}
      {...rest}
    >
      {children}
    </ComponentProp>
  );
});

Paper.propTypes = {
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  children: PropTypes.node,
  elevation: PropTypes.number,
  className: PropTypes.string
};

export default Paper;
