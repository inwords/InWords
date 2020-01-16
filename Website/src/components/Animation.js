import React from 'react';
import PropTypes from 'prop-types';

function Animation({
  animationName,
  children,
  transitionDuration = 225,
  style,
  ...rest
}) {
  return React.cloneElement(children, {
    style: {
      animation: `${animationName} ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
      ...style
    },
    ...rest
  });
}

Animation.propTypes = {
  animationName: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  transitionDuration: PropTypes.number
};

export default Animation;
