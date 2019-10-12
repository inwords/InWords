import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Typography from 'src/components/Typography';

import './link.scss';

const Link = React.forwardRef(function Link(props, ref) {
  const {
    component = 'a',
    children,
    color = 'primary',
    className,
    ...rest
  } = props;

  return (
    <Typography
      ref={ref}
      component={component}
      color={color}
      className={classNames('link', {
        [className]: Boolean(className)
      })}
      {...rest}
    >
      {children}
    </Typography>
  );
});

Link.propTypes = {
  component: PropTypes.elementType,
  children: PropTypes.node,
  color: PropTypes.string,
  className: PropTypes.string
};

export default Link;
