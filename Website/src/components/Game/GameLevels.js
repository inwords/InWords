import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import GameLevelInfoCard from './GameLevelInfoCard';

const styles = {
    root: {
        display: 'flex',
    },
};

function GameLevels({ gameInfo, handleRedirection, classes }) {
    return (
        <div className={classes.root}>
            <Grid container spacing={24}>
                {gameInfo.levelInfos.map((levelInfo) => (
                    <Grid key={levelInfo.levelId} item xs={12} sm={6} md={4} lg={3} xl={2}>
                        <GameLevelInfoCard
                            levelInfo={levelInfo}
                            handleRedirection={handleRedirection}
                        />
                    </Grid>
                ))}
            </Grid>
        </div >
    );
}

GameLevels.propTypes = {
    gameInfo: PropTypes.shape({
        gameId: PropTypes.number.isRequired,
        creator: PropTypes.string.isRequired,
        levelInfos: PropTypes.arrayOf(PropTypes.shape({
            levelId: PropTypes.number.isRequired,
            level: PropTypes.number.isRequired,
            isAvailable: PropTypes.bool.isRequired,
            playerStars: PropTypes.number.isRequired,
        })).isRequired,
    }).isRequired,
    handleRedirection: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GameLevels);
