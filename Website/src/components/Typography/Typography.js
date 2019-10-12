import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './typography.scss';

const variantMapping = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body1: 'p',
  body2: 'p'
};

const Typography = React.forwardRef(function Typography(props, ref) {
  const {
    component,
    children,
    variant = 'body1',
    color = 'text-primary',
    className,
    ...rest
  } = props;

  const Component = component || variantMapping[variant];

  return (
    <Component
      ref={ref}
      className={classNames(
        'typography',
        `typography--variant--${variant}`,
        `typography--color--${color}`,
        {
          [className]: Boolean(className)
        }
      )}
      {...rest}
    >
      {children}
    </Component>
  );
});

Typography.propTypes = {
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  children: PropTypes.node,
  variant: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string
};

export default Typography;
