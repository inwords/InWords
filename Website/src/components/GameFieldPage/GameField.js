import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid/index';
import { AppBarContext } from '../TopAppBar/AppBarContext';
import UpwardButton from '../shared/UpwardButton';
import GameWordCard from './GameWordCard';

const cardsSpacing = 16;
const cardDimension = 140;

const styles = theme => ({
    gridOfTwoColumns: {
        width: 'auto',
        display: 'block',
        [theme.breakpoints.up(cardDimension * 2 + cardsSpacing * 2 * 2 + theme.spacing.unit * 3 * 2)]: {
            width: cardDimension * 2 + cardsSpacing * 2 * 2,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    gridOfThreeColumns: {
        width: 'auto',
        display: 'block',
        [theme.breakpoints.up(cardDimension * 3 + cardsSpacing * 3 * 2 + theme.spacing.unit * 3 * 2)]: {
            width: cardDimension * 3 + cardsSpacing * 3 * 2,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    gridOfFourColumns: {
        width: 'auto',
        display: 'block',
        [theme.breakpoints.up(cardDimension * 4 + cardsSpacing * 4 * 2 + theme.spacing.unit * 3 * 2)]: {
            width: cardDimension * 4 + cardsSpacing * 4 * 2,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        height: cardDimension,
        width: cardDimension,
        display: 'flex',
        alignItems: 'center',
    },
    text: {
        width: cardDimension,
        overflowWrap: 'break-word',
        padding: theme.spacing.unit,
    },
});

function GameField(
    {
        columnsNum,
        infoAboutRandomWords,
        infoAboutSelectedWords,
        successfulPairIds,
        successfulSelectedPairId,
        handleClick,
        classes
    }
) {
    const { resetAppBar } = React.useContext(AppBarContext);

    React.useEffect(() => {
        resetAppBar({
            title: 'Уровень',
            leftElements: <UpwardButton />,
        });
    }, []);

    return (
        <Grid
            container
            className={
                columnsNum <= 2 ? classes.gridOfTwoColumns :
                    columnsNum === 3 ? classes.gridOfThreeColumns :
                        classes.gridOfFourColumns}
        >
            <Grid container justify="center" spacing={cardsSpacing}>
                {infoAboutRandomWords.map((infoAboutRandomWord, index) => (
                    <Grid key={index} item onClick={handleClick(infoAboutRandomWord.pairId, index)}>
                        <GameWordCard
                            word={infoAboutRandomWord.word}
                            selected={Boolean(infoAboutSelectedWords.find(selectedWordInfo => selectedWordInfo.wordId === index))}
                            successful={successfulPairIds.includes(infoAboutRandomWord.pairId)}
                            successfulSelected={successfulSelectedPairId === infoAboutRandomWord.pairId}
                        />
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
}

GameField.propTypes = {
    columnsNum: PropTypes.number.isRequired,
    infoAboutRandomWords: PropTypes.arrayOf(PropTypes.shape({
        pairId: PropTypes.number.isRequired,
        word: PropTypes.string.isRequired,
    })).isRequired,
    infoAboutSelectedWords: PropTypes.arrayOf(PropTypes.shape({
        pairId: PropTypes.number.isRequired,
        wordId: PropTypes.number.isRequired,
    })).isRequired,
    successfulPairIds: PropTypes.arrayOf(
        PropTypes.number.isRequired,
    ).isRequired,
    successfulSelectedPairId: PropTypes.number.isRequired,
    handleClick: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GameField);
