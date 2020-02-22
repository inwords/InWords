import React from 'react';
import Animation from 'src/components/core/Animation';

import './FadeAnimation.css';

function FadeAnimation(props) {
  return <Animation animationName="fade" {...props} />;
}

export default FadeAnimation;
