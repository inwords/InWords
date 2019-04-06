import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import { drawerWidth } from '../AppBar/RegularAppBar';
import GameInfoCard from './GameInfoCard';

const styles = theme => ({
    root: {
        [theme.breakpoints.up(1100 + drawerWidth + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
});

function Games({ gamesInfo, handleRedirection, classes }) {
    return (
        <div className={classes.root}>
            <Grid container spacing={24}>
                {gamesInfo.map((gameInfo) => (
                    <Grid key={gameInfo.gameId} item xs={12} sm={6} md={4}>
                        <GameInfoCard
                            gameInfo={gameInfo}
                            handleRedirection={handleRedirection}
                        />
                    </Grid>
                ))}
            </Grid>
        </div >
    );
}

Games.propTypes = {
    gamesInfo: PropTypes.arrayOf(PropTypes.shape({
        gameId: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        isAvailable: PropTypes.bool.isRequired,
    })).isRequired,
    handleRedirection: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Games);
