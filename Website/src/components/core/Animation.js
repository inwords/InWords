import React from 'react';
import PropTypes from 'prop-types';

function Animation({
  children,
  animationName,
  animationDuration = 225,
  animationTimingFunction = 'cubic-bezier(0.4, 0, 0.2, 1)',
  style = {},
  onAnimationEnd,
  ...rest
}) {
  const [fired, setFired] = React.useState(false);

  const handleAnimationEnd = event => {
    setFired(true);

    if (onAnimationEnd) {
      onAnimationEnd(event);
    }
  };

  const animationStyles = {
    animationName,
    animationDuration: `${animationDuration}ms`,
    animationTimingFunction
  };

  return React.cloneElement(children, {
    style: !fired
      ? {
          ...animationStyles,
          ...style
        }
      : style,
    onAnimationEnd: handleAnimationEnd,
    ...rest
  });
}

Animation.propTypes = {
  children: PropTypes.node.isRequired,
  animationName: PropTypes.string.isRequired,
  animationDuration: PropTypes.number,
  animationTimingFunction: PropTypes.string,
  onAnimationEnd: PropTypes.func
};

export default Animation;
