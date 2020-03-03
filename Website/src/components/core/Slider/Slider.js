import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Slider.scss';

function Slider({ className, ...rest }) {
  return (
    <span className={classNames('slider', className)}>
      <input type="range" className="slider__input" {...rest} />
    </span>
  );
}

Slider.propTypes = {
  className: PropTypes.string
};

export default Slider;
