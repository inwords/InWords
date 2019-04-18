import React from 'react';
import PropTypes from 'prop-types';
import { AppBarContext } from '../TopAppBar/AppBarContext';
import GameLevels from './GameLevels';
import UpwardButton from '../shared/UpwardButton';
import withActualGameInfo from './withActualGameInfo';

function GameLevelsContainer({ gameInfo }) {
    const { resetAppBar } = React.useContext(AppBarContext);

    React.useEffect(() => {
        resetAppBar({
            title: 'Уровни',
            leftElements: <UpwardButton />,
        });
    }, []);

    return <GameLevels gameInfo={gameInfo} />;
}

GameLevelsContainer.propTypes = {
    gameInfo: PropTypes.object.isRequired
};

export default (withActualGameInfo(GameLevelsContainer));
