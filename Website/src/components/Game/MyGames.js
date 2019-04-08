import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import GameInfoCard from './GameInfoCard';
import PageContentContainer from '../PageContentContainer';
import GamePackAdditionContainer from '../../containers/Game/GamePackAdditionContainer';

const styles = theme => ({
    grid: {
        marginTop: theme.spacing.unit,
    },
});

function MyGames({ gamesInfo, classes, ...rest }) {
    return (
        <PageContentContainer>
            <GamePackAdditionContainer />
            <Grid container spacing={24} className={classes.grid} >
                {gamesInfo.map((gameInfo) => (
                    <Grid key={gameInfo.gameId} item xs={12} sm={6} md={4}>
                        <GameInfoCard
                            gameInfo={gameInfo}
                            {...rest}
                        />
                    </Grid>
                ))}
            </Grid>
        </PageContentContainer>
    );
}

MyGames.propTypes = {
    gamesInfo: PropTypes.arrayOf(PropTypes.shape({
        gameId: PropTypes.number.isRequired,
    })).isRequired,
    handleRedirection: PropTypes.func.isRequired,
    handleGamePackDeletion: PropTypes.func,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MyGames);
