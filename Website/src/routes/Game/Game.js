import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Paper from 'src/components/Paper';
import Typography from 'src/components/Typography';
import Fade from 'src/components/Fade';
import Zoom from 'src/components/Zoom';

import './Game.scss';

const cardDimension = 110;
const cardsSpacing = 1;

const useStyles = makeStyles(theme => ({
  twoColumnsLayout: {
    [theme.breakpoints.up(
      cardDimension * 2 + theme.spacing(cardsSpacing * 4)
    )]: {
      width: cardDimension * 2 + theme.spacing(cardsSpacing * 2),
      margin: 'auto'
    }
  },
  threeColumnsLayout: {
    [theme.breakpoints.up(
      cardDimension * 3 + theme.spacing(cardsSpacing * 6)
    )]: {
      width: cardDimension * 3 + theme.spacing(cardsSpacing * 3),
      margin: 'auto'
    }
  },
  fourColumnsLayout: {
    [theme.breakpoints.up(
      cardDimension * 4 + theme.spacing(cardsSpacing * 8)
    )]: {
      width: cardDimension * 4 + theme.spacing(cardsSpacing * 4),
      margin: 'auto'
    }
  }
}));

function Game({
  wordPairs,
  selectedWordPairs,
  completedPairIdsMap,
  selectedCompletedPairId,
  isGameCompleted,
  handleClick
}) {
  const cols = React.useMemo(() => {
    const colsNum = Math.ceil(Math.sqrt(wordPairs.length));

    if (colsNum <= 2) {
      return 2;
    } else if (colsNum >= 4) {
      return 4;
    }
    return colsNum;
  }, [wordPairs.length]);

  return (
    <div className={classNames('game-field', `game-field--cols-${cols}`)}>
      {wordPairs.map(({ id, pairId, word }) => (
        <Fade key={id} in={!isGameCompleted}>
          <div>
            <Paper
              onClick={handleClick(pairId, id)}
              depthShadow={selectedCompletedPairId === pairId ? 16 : 4}
              className="game-card"
            >
              <Zoom
                in={
                  completedPairIdsMap[pairId] ||
                  Boolean(
                    selectedWordPairs.find(
                      selectedWordInfo => selectedWordInfo.id === id
                    )
                  )
                }
              >
                <div className="game-card-content">
                  <span className="game-card-text">{word}</span>
                </div>
              </Zoom>
            </Paper>
          </div>
        </Fade>
      ))}
    </div>
  );
}

Game.propTypes = {
  wordPairs: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      pairId: PropTypes.number.isRequired,
      word: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  selectedWordPairs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired
    }).isRequired
  ).isRequired,
  completedPairIdsMap: PropTypes.objectOf(PropTypes.bool.isRequired).isRequired,
  selectedCompletedPairId: PropTypes.number.isRequired,
  isGameCompleted: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired
};

export default Game;
