import { cloneElement, useState } from 'react';
import PropTypes from 'prop-types';

function Animation({
  children,
  animationName,
  animationDuration = 'var(--transition-duration-entering-screen)',
  animationTimingFunction = 'var(--transition-easing-ease-in-out)',
  style,
  onAnimationEnd,
  ...rest
}) {
  const [fired, setFired] = useState(false);

  const handleAnimationEnd = event => {
    setFired(true);

    if (onAnimationEnd) {
      onAnimationEnd(event);
    }
  };

  const animationStyle = {
    animationName,
    animationDuration: `${animationDuration}`,
    animationTimingFunction,
    ...style
  };

  return cloneElement(children, {
    style: !fired ? animationStyle : style,
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
