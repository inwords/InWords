import React from 'react';
import PropTypes from 'prop-types';

const initialTransitionDurations = {
  enter: 225,
  exit: 150
};

function Transition({
  in: inProp,
  component,
  transitionDurations = initialTransitionDurations,
  transitionProperty,
  transitionTimingFunction = 'cubic-bezier(0.4, 0, 0.2, 1)',
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

  const Component = component;

  return (
    <Component
      style={{
        transitionProperty,
        transitionDuration: `${
          transitionDurations[inProp ? 'enter' : 'exit']
        }ms`,
        transitionTimingFunction,
        visibility: exited ? 'hidden' : undefined,
        ...style
      }}
      animationDuration={transitionDurations.enter}
      animationTimingFunction={transitionTimingFunction}
      onTransitionEnd={handleTransitionEnd}
      {...rest}
    />
  );
}

Transition.propTypes = {
  in: PropTypes.bool,
  component: PropTypes.elementType.isRequired,
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
