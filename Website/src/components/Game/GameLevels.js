import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import GameLevelInfoCard from './GameLevelInfoCard';
import PageContentContainer from '../PageContentContainer';

function GameLevels({ gameInfo, handleRedirection }) {
    return (
        <PageContentContainer>
            <Grid container spacing={24}>
                {gameInfo.levelInfos.map((levelInfo) => (
                    <Grid key={levelInfo.levelId} item xs={12} sm={4} md={3}>
                        <GameLevelInfoCard
                            levelInfo={levelInfo}
                            handleRedirection={handleRedirection}
                        />
                    </Grid>
                ))}
            </Grid>
        </PageContentContainer >
    );
}

GameLevels.propTypes = {
    gameInfo: PropTypes.shape({
        levelInfos: PropTypes.arrayOf(PropTypes.shape({
            levelId: PropTypes.number.isRequired,
        })).isRequired,
    }).isRequired,
    handleRedirection: PropTypes.func.isRequired,
};

export default GameLevels;
