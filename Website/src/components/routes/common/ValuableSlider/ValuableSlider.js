import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'src/components/core/Typography';
import Slider from 'src/components/core/Slider';

import './ValuableSlider.scss';

function ValuableSlider({ value, postfix = '', ...rest }) {
  return (
    <div className="valuable-slider">
      <Slider className="valuable-slider__slider" {...rest} />
      <Typography variant="body1" className="valuable-slider__value">
        {value}
        {postfix}
      </Typography>
    </div>
  );
}

ValuableSlider.propTypes = {
  value: PropTypes.number.isRequired,
  postfix: PropTypes.string
};

export default ValuableSlider;
