import React from 'react';
import PropTypes from 'prop-types';

function Animation({
  children,
  animationName,
  animationDuration = 225,
  animationTimingFunction = 'cubic-bezier(0.4, 0, 0.2, 1)',
  style = {},
  ...rest
}) {
  return React.cloneElement(children, {
    style: {
      animationName,
      animationDuration: `${animationDuration}ms`,
      animationTimingFunction,
      ...style
    },
    ...rest
  });
}

Animation.propTypes = {
  children: PropTypes.node.isRequired,
  animationName: PropTypes.string.isRequired,
  animationDuration: PropTypes.number,
  animationTimingFunction: PropTypes.string
};

export default Animation;
