import React from 'react';
import PropTypes from 'prop-types';

function Animation({
  children,
  animationName,
  animationDuration = 200,
  animationTimingFunction = 'var(--transition-ease-in-out)',
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
    animationTimingFunction,
    ...style
  };

  return React.cloneElement(children, {
    style: !fired ? animationStyles : style,
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
