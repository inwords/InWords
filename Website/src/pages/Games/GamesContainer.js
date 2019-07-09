import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import gamesApiActions from '../../actions/gamesApiActions';
import Games from './Games';

function GamesContainer() {
    const gamesInfo = useSelector(store => store.games.gamesInfo);

    const dispatch = useDispatch();
    const receiveGamesInfo = useCallback(
        () => dispatch(gamesApiActions.receiveGamesInfo()),
        [dispatch]
    );

    useEffect(() => {
        if (!gamesInfo.length) {
            receiveGamesInfo();
        }
    }, [gamesInfo.length, receiveGamesInfo]);

    return (
        <Games
            gamesInfo={gamesInfo}
        />
    );
}

export default GamesContainer;
