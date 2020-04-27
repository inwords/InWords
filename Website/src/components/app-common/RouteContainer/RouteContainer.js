import React from 'react';
import Container from 'src/components/core/Container';

import './RouteContainer.css';

function RouteContainer(props) {
  return <Container className="route-container" {...props} />;
}

export default RouteContainer;
