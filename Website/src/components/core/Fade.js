import React from 'react';
import PropTypes from 'prop-types';
import Transition from 'src/components/core/Transition';

function Fade({ in: inProp, ...rest }) {
  return (
    <Transition
      transitionProperty="opacity"
      in={inProp}
      style={{
        opacity: inProp ? '1' : '0'
      }}
      {...rest}
    />
  );
}

Fade.propTypes = {
  in: PropTypes.bool,
  onTransitionEnd: PropTypes.func
};

export default Fade;
