import React from 'react';
import PropTypes from 'prop-types';

const initialTransitionDurations = {
  enter: 200,
  exit: 150
};

function Transition({
  children,
  in: inProp,
  transitionDurations = initialTransitionDurations,
  transitionProperty,
  transitionTimingFunction = 'var(--transition-ease-in-out)',
  style = {},
  onTransitionEnd,
  ...rest
}) {
  const [exited, setExited] = React.useState(true);

  React.useEffect(() => {
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

  return React.cloneElement(children, {
    style: {
      transitionProperty,
      transitionDuration: `${transitionDurations[inProp ? 'enter' : 'exit']}ms`,
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
    enter: PropTypes.number.isRequired,
    exit: PropTypes.number.isRequired
  }),
  transitionProperty: PropTypes.string.isRequired,
  transitionTimingFunction: PropTypes.string,
  style: PropTypes.object,
  onTransitionEnd: PropTypes.func
};

export default Transition;
