import React from 'react';
import Animation from 'src/components/Animation';

import './ZoomAnimation.css';

function ZoomAnimation(props) {
  return <Animation animationName="zoom" {...props} />;
}

export default ZoomAnimation;
