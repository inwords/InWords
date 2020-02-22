import React from 'react';
import classNames from 'classnames';

import './Slider.scss';

function Slider({ className, ...rest }) {
  return (
    <span className={classNames('slider', className)}>
      <input type="range" className="slider__input" {...rest} />
    </span>
  );
}

export default Slider;
