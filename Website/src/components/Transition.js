import React from 'react';
import PropTypes from 'prop-types';

const transitionDuration = {
  enter: 225,
  exit: 150
};

function Transition({
  component,
  transitionProperty,
  in: inProp,
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
        transition: `${transitionProperty} ${
          transitionDuration[inProp ? 'enter' : 'exit']
        }ms cubic-bezier(0.4, 0, 0.2, 1)`,
        visibility: exited ? 'hidden' : undefined,
        ...style
      }}
      transitionDuration={transitionDuration.enter}
      onTransitionEnd={handleTransitionEnd}
      {...rest}
    />
  );
}

Transition.propTypes = {
  component: PropTypes.elementType.isRequired,
  transitionProperty: PropTypes.string.isRequired,
  in: PropTypes.bool,
  style: PropTypes.object,
  onTransitionEnd: PropTypes.func
};

export default Transition;
