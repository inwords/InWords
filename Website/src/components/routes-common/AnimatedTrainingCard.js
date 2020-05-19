import React from 'react';
import PropTypes from 'prop-types';
import FadeAnimation from 'src/components/core/FadeAnimation';
import Fade from 'src/components/core/Fade';
import TrainingCard from 'src/components/routes-common/TrainingCard';

function AnimatedTrainingCard({ visible = true, ...rest }) {
  return (
    <FadeAnimation>
      <Fade in={visible}>
        <div>
          <TrainingCard {...rest} />
        </div>
      </Fade>
    </FadeAnimation>
  );
}

AnimatedTrainingCard.propTypes = {
  visible: PropTypes.bool
};

export default AnimatedTrainingCard;
