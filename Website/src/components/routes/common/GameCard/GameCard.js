import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'src/components/core/Paper';
import Zoom from 'src/components/core/Zoom';

import './GameCard.scss';

function GameCard({
  open = true,
  dimension = 120,
  textSize = 16,
  children,
  ...rest
}) {
  return (
    <Paper
      className="game-card"
      style={{
        width: dimension,
        height: dimension,
        fontSize: textSize
      }}
      {...rest}
    >
      <Zoom
        in={open}
        style={{
          height: dimension
        }}
      >
        <div className="game-card-content">
          <span className="game-card-text">{children}</span>
        </div>
      </Zoom>
    </Paper>
  );
}

GameCard.propTypes = {
  open: PropTypes.bool,
  dimension: PropTypes.number,
  textSize: PropTypes.number
};

export default GameCard;
