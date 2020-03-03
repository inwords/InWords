import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Typography.scss';

const variantMapping = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body1: 'span',
  body2: 'span'
};

function Typography({
  component,
  variant = 'body2',
  color = 'text-primary',
  gutterBottom,
  className,
  ...rest
}) {
  const Component = component || variantMapping[variant];

  return (
    <Component
      className={classNames(
        'typography',
        `typography--variant--${variant}`,
        `typography--color--${color}`,
        className,
        {
          'typography--gutter-bottom': gutterBottom
        }
      )}
      {...rest}
    />
  );
}

Typography.propTypes = {
  component: PropTypes.elementType,
  variant: PropTypes.string,
  color: PropTypes.string,
  gutterBottom: PropTypes.bool,
  className: PropTypes.string
};

export default Typography;
