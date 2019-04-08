import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import GameInfoCard from './GameInfoCard';
import PageContentContainer from '../PageContentContainer';

function Games({ gamesInfo, handleRedirection }) {
    return (
        <PageContentContainer>
            <Grid container spacing={24}>
                {gamesInfo.map(gameInfo => (
                    <Grid key={gameInfo.gameId} item xs={12} sm={6} md={4}>
                        <GameInfoCard
                            gameInfo={gameInfo}
                            handleRedirection={handleRedirection}
                        />
                    </Grid>
                ))}
            </Grid>
        </PageContentContainer >
    );
}

Games.propTypes = {
    gamesInfo: PropTypes.arrayOf(PropTypes.shape({
        gameId: PropTypes.number.isRequired,
    })).isRequired,
    handleRedirection: PropTypes.func.isRequired,
};

export default Games;
