import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Paper from 'src/components/core/Paper';
import ButtonBase from 'src/components/core/ButtonBase';
import Zoom from 'src/components/core/Zoom';

import './TrainingCard.scss';

function TrainingCard({
  open = true,
  color,
  dimension = 120,
  textSize = 16,
  margin,
  children,
  className,
  ...rest
}) {
  return (
    <Paper
      component={ButtonBase}
      square
      className={classNames('training-card', className)}
      style={{
        width: dimension,
        height: dimension,
        fontSize: `${textSize}rem`,
        margin
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
  margin: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired
  ]),
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default TrainingCard;
