import { combineReducers } from 'redux';
import { gameConstants } from '../constants/gameConstants';

const gamesInfo = (state = [], action) => {
    switch (action.type) {
        case gameConstants.GAMES_INFO_RECEIVED:
            return action.gamesInfo;
        case gameConstants.GAMES_INFO_ADD_LOCAL_REFRESH:
            return state.concat(action.gamesInfo);
        case gameConstants.GAMES_INFO_DEL_LOCAL_REFRESH:
            return state.filter((gameInfo) => gameInfo.gameId !== action.gameId);
        default:
            return state;
    }
};

const gameInfo = (state = null, action) => {
    switch (action.type) {
        case gameConstants.GAME_INFO_RECEIVED:
            return action.gameInfo;
        case gameConstants.GAME_INFO_RESET:
            return null;
        default:
            return state;
    }
};

const gameLevel = (state = null, action) => {
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
    gamesInfo,
    gameInfo,
    gameLevel
});
