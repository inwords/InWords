import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Paper from 'src/components/core/Paper';
import Zoom from 'src/components/core/Zoom';

import './TrainingCard.scss';

function TrainingCard({
  open = true,
  color,
  dimension = 120,
  textSize = 16,
  children,
  ...rest
}) {
  return (
    <Paper
      className="training-card"
      style={{
        width: dimension,
        height: dimension,
        fontSize: `${textSize}rem`
      }}
      {...rest}
    >
      <Zoom in={open} className="training-card-content-container">
        <div>
          <div
            className={classNames('training-card-content', {
              [`training-card-content--color--${color}`]: color
            })}
          >
            <span className="training-card-text">{children}</span>
          </div>
        </div>
      </Zoom>
    </Paper>
  );
}

TrainingCard.propTypes = {
  open: PropTypes.bool,
  color: PropTypes.string,
  dimension: PropTypes.number,
  textSize: PropTypes.number,
  children: PropTypes.node.isRequired
};

export default TrainingCard;
