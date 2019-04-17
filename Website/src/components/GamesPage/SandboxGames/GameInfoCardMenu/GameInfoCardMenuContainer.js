import React from 'react';
import GameInfoCardMenu from './GameInfoCardMenu';

function GameInfoCardMenuContainer(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <GameInfoCardMenu
            anchorEl={anchorEl}
            handleMenu={handleMenu}
            handleClose={handleClose}
            {...props}
        />
    );
}

export default GameInfoCardMenuContainer;
