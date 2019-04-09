import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import GameInfoCard from './GameInfoCard';
import GamePackAdditionContainer from '../../containers/Game/GamePackAdditionContainer';

function SandboxGames({ gamesInfo, ...rest }) {
    return (
        <Fragment>
            <GamePackAdditionContainer />
            <Grid container spacing={24} >
                {gamesInfo.map((gameInfo) => (
                    <Grid key={gameInfo.gameId} item xs={12} sm={6} md={4}>
                        <GameInfoCard
                            gameInfo={gameInfo}
                            {...rest}
                        />
                    </Grid>
                ))}
            </Grid>
        </Fragment>
    );
}

SandboxGames.propTypes = {
    gamesInfo: PropTypes.arrayOf(PropTypes.shape({
        gameId: PropTypes.number.isRequired,
    })).isRequired,
    handleRedirection: PropTypes.func.isRequired,
    handleGamePackDeletion: PropTypes.func,
};

export default SandboxGames;
