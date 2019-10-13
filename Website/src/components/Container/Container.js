import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './container.scss';

const Container = React.forwardRef(function Container(props, ref) {
  const {
    component = 'div',
    children,
    maxWidth = 'lg',
    className,
    ...rest
  } = props;

  const Component = component;

  return (
    <Component
      ref={ref}
      className={classNames('container', `container--max-width--${maxWidth}`, {
        [className]: Boolean(className)
      })}
      {...rest}
    >
      {children}
    </Component>
  );
});

Container.propTypes = {
  component: PropTypes.elementType,
  children: PropTypes.node,
  maxWidth: PropTypes.string,
  className: PropTypes.string
};

export default Container;
