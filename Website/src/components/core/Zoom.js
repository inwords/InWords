import React from 'react';
import PropTypes from 'prop-types';
import Transition from 'src/components/core/Transition';

function Zoom({ in: inProp, style, ...rest }) {
  return (
    <Transition
      transitionProperty="transform"
      in={inProp}
      style={{
        transform: inProp ? 'none' : 'scale(0)',
        ...style
      }}
      {...rest}
    />
  );
}

Zoom.propTypes = {
  in: PropTypes.bool,
  style: PropTypes.object,
  onTransitionEnd: PropTypes.func
};

export default Zoom;
