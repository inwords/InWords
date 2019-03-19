import { API_HOST } from '../api-info';
import { FetchingActions } from './FetchingActions';
import { AccessActions } from './AccessActions';
import { gameConstants } from '../constants/gameConstants';

const pullGamesInfo = () => (dispatch, getState) => {
    dispatch(FetchingActions.fetchingRequest());

    fetch(`${API_HOST}/api/Game/GameInfo`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getState().accessToken}`
        }
    })
        .then(response => {
            if (!response.ok) {
                AccessActions.handleAccessError(response, dispatch);
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(data => {
            dispatch(FetchingActions.fetchingSuccess());
            dispatch(gamesInfoReceived(data));
        })
        .catch(err => {
            console.error(err);
            dispatch(FetchingActions.fetchingFailure(new Error('Ошибка загрузки информации об играх')));
        });
}

const pullGameInfo = (gameId) => (dispatch, getState) => {
    dispatch(FetchingActions.fetchingRequest());

    fetch(`${API_HOST}/api/Game/${gameId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getState().accessToken}`
        }
    })
        .then(response => {
            if (!response.ok) {
                AccessActions.handleAccessError(response, dispatch);
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(data => {
            dispatch(FetchingActions.fetchingSuccess());
            dispatch(gameInfoReceived(data));
        })
        .catch(err => {
            console.error(err);
            dispatch(FetchingActions.fetchingFailure(new Error('Ошибка загрузки информации об игре')));
        });
}

const pullGameLevel = (levelId) => (dispatch, getState) => {
    dispatch(FetchingActions.fetchingRequest());

    fetch(`${API_HOST}/api/Game/level/${levelId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getState().accessToken}`
        }
    })
        .then(response => {
            if (!response.ok) {
                AccessActions.handleAccessError(response, dispatch);
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(data => {
            dispatch(FetchingActions.fetchingSuccess());
            dispatch(gameLevelReceived(data));
        })
        .catch(err => {
            console.error(err);
            dispatch(FetchingActions.fetchingFailure(new Error('Ошибка загрузки уровня')));
        });
}

const addGamePack = (gamePack) => (dispatch, getState) => {
    dispatch(FetchingActions.fetchingRequest());

    gamePack.CreationInfo.CreatorID = getState().user.userInfo.userId;
    fetch(`${API_HOST}/api/Game/AddGamePack`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getState().accessToken}`
        },
        body: JSON.stringify(gamePack)
    })
        .then(response => {
            if (!response.ok) {
                AccessActions.handleAccessError(response, dispatch);
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(data => {
            dispatch(FetchingActions.fetchingSuccess());
            dispatch(gamesInfoAddLocalRefresh({
                gameId: data.serverId,
                isAvailable: true,
                title: gamePack.CreationInfo.Descriptions[0].Title
            }));
        })
        .catch(err => {
            console.error(err);
            dispatch(FetchingActions.fetchingFailure(new Error('Ошибка добавления игры')));
        });
}

function resetGameInfo() {
    return (dispatch) => {
        dispatch(gameInfoReset());
    }
}

function resetGameLevel() {
    return (dispatch) => {
        dispatch(gameLevelReset());
    }
}

const gamesInfoReceived = (gamesInfo) => ({
    type: gameConstants.GAMES_INFO_RECEIVED,
    gamesInfo: gamesInfo
});

const gamesInfoAddLocalRefresh = (gamesInfo) => ({
    type: gameConstants.GAMES_INFO_ADD_LOCAL_REFRESH,
    gamesInfo: gamesInfo
});

const gameInfoReceived = (gameInfo) => ({
    type: gameConstants.GAME_INFO_RECEIVED,
    gameInfo: gameInfo
});

const gameInfoReset = () => ({
    type: gameConstants.GAME_INFO_RESET
});

const gameLevelReceived = (gameLevel) => ({
    type: gameConstants.GAME_LEVEL_RECEIVED,
    gameLevel: gameLevel
});

const gameLevelReset = () => ({
    type: gameConstants.GAME_LEVEL_RESET
});

export const GameActions = {
    pullGamesInfo,
    pullGameInfo,
    pullGameLevel,
    resetGameInfo,
    resetGameLevel,
    addGamePack
};
