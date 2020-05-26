import React from 'react';
import ZoomAnimation from 'src/components/core/ZoomAnimation';
import TrainingCard from 'src/components/routes-common/TrainingCard';

function AnimatedTrainingCard(props) {
  return (
    <ZoomAnimation>
      <div>
        <TrainingCard {...props} />
      </div>
    </ZoomAnimation>
  );
}

export default AnimatedTrainingCard;
