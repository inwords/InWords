import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid/index';
import PageContentContainer from '../shared/PageContentContainer';
import GameLevelInfoCard from './GameLevelInfoCard';

function GameLevels({ gameInfo }) {
    return (
        <PageContentContainer>
            <Grid container spacing={24}>
                {gameInfo.levelInfos.map(levelInfo => (
                    <Grid key={levelInfo.levelId} item xs={12} sm={4} md={3}>
                        <GameLevelInfoCard levelInfo={levelInfo} />
                    </Grid>
                ))}
            </Grid>
        </PageContentContainer>
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
