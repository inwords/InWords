import React from 'react';
import PropTypes from 'prop-types';
import Transition from 'src/components/Transition';

function Fade({ in: inProp, style = {}, ...rest }) {
  return (
    <Transition
      transitionProperty="opacity"
      in={inProp}
      style={{
        opacity: inProp ? '1' : '0',
        ...style
      }}
      {...rest}
    />
  );
}

Fade.propTypes = {
  in: PropTypes.bool,
  style: PropTypes.object,
  onTransitionEnd: PropTypes.func
};

export default Fade;
