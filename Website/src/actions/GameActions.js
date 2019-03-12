import { API_HOST } from '../api-info';
import { FetchingActions } from './FetchingActions';
import { AccessActions } from './AccessActions';
import { ErrorMessageActions } from './ErrorMessageActions';
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
                    AccessActions.handleAccessError(response, dispatch);
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(data => {
                dispatch(FetchingActions.fetchingSuccess());
                dispatch(gamesInfoReceived(data));

                if (getState().errorMessage) {
                    dispatch(ErrorMessageActions.resetErrorMessage());
                }
            })
            .catch(err => {
                console.error(err);
                dispatch(FetchingActions.fetchingFailure(new Error('Ошибка загрузки информации об играх')));
            });
    }
}

function completeGame() {
    return (dispatch) => {
        dispatch(gameLevelReset());
    }
}

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
                    AccessActions.handleAccessError(response, dispatch);
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(data => {
                dispatch(FetchingActions.fetchingSuccess());
                dispatch(gameInfoReceived(data));

                if (getState().errorMessage) {
                    dispatch(ErrorMessageActions.resetErrorMessage());
                }
            })
            .catch(err => {
                console.error(err);
                dispatch(FetchingActions.fetchingFailure(new Error('Ошибка загрузки информации об игре')));
            });
    }
}

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
                    AccessActions.handleAccessError(response, dispatch);
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(data => {
                dispatch(FetchingActions.fetchingSuccess());
                dispatch(gameLevelReceived(data));

                if (getState().errorMessage) {
                    dispatch(ErrorMessageActions.resetErrorMessage());
                }
            })
            .catch(err => {
                console.error(err);
                dispatch(FetchingActions.fetchingFailure(new Error('Ошибка загрузки уровня')));
            });
    }
}

const gamesInfoReceived = (gamesInfo) => ({
    type: gameConstants.GAMES_INFO_RECEIVED,
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
    completeGame
};
