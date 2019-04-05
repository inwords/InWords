import { combineReducers } from 'redux';
import gameConstants from '../constants/gameConstants';

const gamesInfo = (state = null, action) => {
    switch (action.type) {
        case gameConstants.GAMES_INFO_INITIALIZATION:
            return action.gamesInfo;
        case gameConstants.GAMES_INFO_UPDATE_AFTER_ADDITION:
            return state.concat(action.gamesInfo);
        case gameConstants.GAMES_INFO_UPDATE_AFTER_DELETION:
            return state.filter((gameInfo) => gameInfo.gameId !== action.gameId);
        default:
            return state;
    }
};

const gameInfo = (state = null, action) => {
    switch (action.type) {
        case gameConstants.GAME_INFO_INITIALIZATION:
            return action.gameInfo;
        case gameConstants.GAME_INFO_CLEARING:
            return null;
        default:
            return state;
    }
};

const gameLevel = (state = null, action) => {
    switch (action.type) {
        case gameConstants.GAME_LEVEL_INITIALIZATION:
            return action.gameLevel;
        case gameConstants.GAME_LEVEL_CLEARING:
            return null;
        default:
            return state;
    }
};

const game = combineReducers({
    gamesInfo,
    gameInfo,
    gameLevel
});

export default game;
