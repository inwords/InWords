import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid/index';
import GameLevelInfoCard from './GameLevelInfoCard';

const styles = theme => ({
    root: {
        [theme.breakpoints.up(1100 + 240 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
});

function GameLevels({ gameInfo, classes }) {
    return (
        <div className={classes.root}>
            <Grid container spacing={24}>
                {gameInfo.levelInfos.map(levelInfo => (
                    <Grid key={levelInfo.levelId} item xs={12} sm={4} md={3}>
                        <GameLevelInfoCard levelInfo={levelInfo} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

GameLevels.propTypes = {
    gameInfo: PropTypes.shape({
        levelInfos: PropTypes.arrayOf(PropTypes.shape({
            levelId: PropTypes.number.isRequired,
        })).isRequired,
    }).isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GameLevels);
