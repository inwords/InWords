import { combineReducers } from 'redux';
import gameConstants from '../constants/gameConstants';

const gamesInfo = (state = null, action) => {
    if (action.type === gameConstants.GAMES_INFO_INITIALIZATION) {
        return action.gamesInfo;
    }
    return state;
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
