import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import GameInfoCard from '../GameInfoCard';
import ButtonWithGameInfoCardMenu from './ButtonWithGameInfoCardMenu';

function SandboxGames({ gamesInfo, handleGamePackDeletion }) {
    return (
        <Grid container spacing={24} >
            {gamesInfo.map(gameInfo => (
                <Grid key={gameInfo.gameId} item xs={12} sm={6} md={4}>
                    <GameInfoCard
                        gameInfo={gameInfo}
                        action={<ButtonWithGameInfoCardMenu handleGamePackDeletion={handleGamePackDeletion(gameInfo.gameId)} />}
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