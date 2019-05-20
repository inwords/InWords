import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import ContentContainer from '../ContentContainer';
import GameLevelInfoCard from './GameLevelInfoCard';

function GameLevels({ gameInfo }) {
    return (
        <ContentContainer>
            <Grid container spacing={24}>
                {gameInfo.levelInfos.map(levelInfo => (
                    <Grid key={levelInfo.levelId} item xs={12} sm={4} md={3}>
                        <GameLevelInfoCard levelInfo={levelInfo} />
                    </Grid>
                ))}
            </Grid>
        </ContentContainer>
    );
}

GameLevels.propTypes = {
    gameInfo: PropTypes.shape({
        levelInfos: PropTypes.arrayOf(PropTypes.shape({
            levelId: PropTypes.number.isRequired,
        })).isRequired,
    }).isRequired
};

export default GameLevels;
