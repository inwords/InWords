import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid/index';
import { AppBarContext } from '../../TopAppBar/AppBarContext';
import GameLevelInfoCard from '../GameLevelInfoCard';
import LargePageContentContainer from '../../PageContentContainers/LargePageContentContainer';
import UpwardButton from '../../shared/UpwardButton';

function GameLevels({ gameInfo, handleRedirection }) {
    const { resetAppBar } = React.useContext(AppBarContext);

    React.useEffect(() => {
        resetAppBar({
            title: 'Уровни',
            leftElements: <UpwardButton />,
        });
    }, []);

    return (
        <LargePageContentContainer>
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
        </LargePageContentContainer >
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
