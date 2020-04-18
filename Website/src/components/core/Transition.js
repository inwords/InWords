import { useState, useEffect, cloneElement } from 'react';
import PropTypes from 'prop-types';

const initialTransitionDurations = {
  enter: 'var(--transition-duration-entering-screen)',
  exit: 'var(--transition-duration-leaving-screen)'
};

function Transition({
  children,
  in: inProp,
  transitionDurations = initialTransitionDurations,
  transitionProperty,
  transitionTimingFunction = 'var(--transition-easing-ease-in-out)',
  style,
  onTransitionEnd,
  ...rest
}) {
  const [exited, setExited] = useState(true);

  useEffect(() => {
    if (inProp) {
      setExited(false);
    }
  }, [inProp]);

  const handleTransitionEnd = event => {
    if (!inProp) {
      setExited(true);
    }

    if (onTransitionEnd) {
      onTransitionEnd(event);
    }
  };

  return cloneElement(children, {
    style: {
      transitionProperty,
      transitionDuration: transitionDurations[inProp ? 'enter' : 'exit'],
      transitionTimingFunction,
      visibility: exited ? 'hidden' : undefined,
      ...style
    },
    onTransitionEnd: handleTransitionEnd,
    ...rest
  });
}

Transition.propTypes = {
  children: PropTypes.node.isRequired,
  in: PropTypes.bool,
  transitionDurations: PropTypes.exact({
    enter: PropTypes.string.isRequired,
    exit: PropTypes.string.isRequired
  }),
  transitionProperty: PropTypes.string.isRequired,
  transitionTimingFunction: PropTypes.string,
  style: PropTypes.object,
  onTransitionEnd: PropTypes.func
};

export default Transition;
