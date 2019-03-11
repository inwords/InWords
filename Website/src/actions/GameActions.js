import { API_HOST } from '../api-info';
import { FetchingActions } from './FetchingActions';
import { AccessTokenActions } from './AccessTokenActions';
import { ErrorActions } from './ErrorActions';
import { gameConstants } from '../constants/gameConstants';

function pullGamesInfo() {
    return (dispatch, getState) => {
        dispatch(FetchingActions.fetchingRequest());

        if (getState().game.gameInfo) {
            dispatch(gameInfoReset());

            if (getState().game.gameLevel) {
                dispatch(gameLevelReset());
            }
        }

        fetch(API_HOST + '/api/Game/GameInfo', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getState().accessToken
            }
        })
            .then(response => {
                if (!response.ok) {
                    AccessTokenActions.handleAccessError(response, dispatch);
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(data => {
                dispatch(FetchingActions.fetchingSuccess());
                dispatch(gamesInfoReceived(data));

                if (getState().errorMessage) {
                    dispatch(ErrorActions.resetErrorMessage());
                }
            })
            .catch(err => {
                console.error(err);
                dispatch(FetchingActions.fetchingFailure(new Error('Ошибка загрузки информации об играх')));
            });
    }
}

const gamesInfoReceived = (gamesInfo) => ({
    type: gameConstants.GAMES_INFO_RECEIVED,
    gamesInfo: gamesInfo
});

const gameInfoReset = () => ({
    type: gameConstants.GAME_INFO_RESET
});

function completeGame() {
    return (dispatch) => {
        dispatch(gameLevelReset());
    }
}

const gameLevelReset = () => ({
    type: gameConstants.GAME_LEVEL_RESET
});

function pullGameInfo(gameId) {
    return (dispatch, getState) => {
        dispatch(FetchingActions.fetchingRequest());

        fetch(API_HOST + '/api/Game/' + gameId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getState().accessToken
            }
        })
            .then(response => {
                if (!response.ok) {
                    AccessTokenActions.handleAccessError(response, dispatch);
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(data => {
                dispatch(FetchingActions.fetchingSuccess());
                dispatch(gameInfoReceived(data));

                if (getState().errorMessage) {
                    dispatch(ErrorActions.resetErrorMessage());
                }
            })
            .catch(err => {
                console.error(err);
                dispatch(FetchingActions.fetchingFailure(new Error('Ошибка загрузки информации об игре')));
            });
    }
}

const gameInfoReceived = (gameInfo) => ({
    type: gameConstants.GAME_INFO_RECEIVED,
    gameInfo: gameInfo
});

function pullGameLevel(levelId) {
    return (dispatch, getState) => {
        dispatch(FetchingActions.fetchingRequest());

        fetch(API_HOST + '/api/Game/level/' + levelId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getState().accessToken
            }
        })
            .then(response => {
                if (!response.ok) {
                    AccessTokenActions.handleAccessError(response, dispatch);
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(data => {
                dispatch(FetchingActions.fetchingSuccess());
                dispatch(gameLevelReceived(data));

                if (getState().errorMessage) {
                    dispatch(ErrorActions.resetErrorMessage());
                }
            })
            .catch(err => {
                console.error(err);
                dispatch(FetchingActions.fetchingFailure(new Error('Ошибка загрузки уровня')));
            });
    }
}

const gameLevelReceived = (gameLevel) => ({
    type: gameConstants.GAME_LEVEL_RECEIVED,
    gameLevel: gameLevel
});

export const GameActions = {
    pullGamesInfo,
    pullGameInfo,
    pullGameLevel,
    completeGame
};
