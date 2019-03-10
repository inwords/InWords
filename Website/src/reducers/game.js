import { combineReducers } from 'redux';
import { gameConstants } from '../constants/gameConstants';

function gamesInfo(state = [], action) {
    switch (action.type) {
        case gameConstants.GAMES_INFO_RECEIVED:
            return action.gamesInfo;
        default:
            return state;
    }
};

function gameInfo(state = null, action) {
    switch (action.type) {
        case gameConstants.GAME_INFO_RECEIVED:
            return action.gameInfo;
        case gameConstants.GAME_INFO_RESET:
            return null;
        default:
            return state;
    }
};

function gameLevel(state = null, action) {
    switch (action.type) {
        case gameConstants.GAME_LEVEL_RECEIVED:
            return action.gameLevel;
        case gameConstants.GAME_LEVEL_RESET:
            return null;
        default:
            return state;
    }
};

export const game = combineReducers({
    gamesInfo: gamesInfo,
    gameInfo: gameInfo,
    gameLevel: gameLevel
});
