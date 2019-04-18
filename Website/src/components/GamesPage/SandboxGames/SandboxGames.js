import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid/index';
import GameInfoCard from '../GameInfoCard';
import GameInfoCardMenu from './GameInfoCardMenu';

function SandboxGames({ gamesInfo, handleGamePackDeletion }) {
    return (
        <Grid container spacing={24} >
            {gamesInfo.map(gameInfo => (
                <Grid key={gameInfo.gameId} item xs={12} sm={6} md={4}>
                    <GameInfoCard
                        gameInfo={gameInfo}
                        action={<GameInfoCardMenu handleGamePackDeletion={handleGamePackDeletion(gameInfo.gameId)} />}
                    />
                </Grid>
            ))}
        </Grid>
    );
}

SandboxGames.propTypes = {
    gamesInfo: PropTypes.arrayOf(
        PropTypes.shape({
            gameId: PropTypes.number.isRequired,
        }).isRequired,
    ).isRequired,
    handleGamePackDeletion: PropTypes.func,
};

export default SandboxGames;
