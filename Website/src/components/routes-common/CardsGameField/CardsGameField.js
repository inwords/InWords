import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import './CardsGameField.scss';

function CardsGameField({ cardDimension, numberOfCards, children }) {
  const maxWidth = useMemo(() => {
    let colsNum = Math.ceil(Math.sqrt(numberOfCards));

    if (colsNum <= 2) {
      colsNum = 2;
    } else if (colsNum === 3) {
      colsNum = 3;
    }

    return cardDimension * colsNum + 8 * colsNum;
  }, [numberOfCards, cardDimension]);

  return (
    <div className="cards-game-field" style={{ maxWidth }}>
      {children}
    </div>
  );
}

CardsGameField.propTypes = {
  cardDimension: PropTypes.number.isRequired,
  numberOfCards: PropTypes.number.isRequired,
  children: PropTypes.node
};

export default CardsGameField;
