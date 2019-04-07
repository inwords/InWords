import { combineReducers } from 'redux';
import gameConstants from '../constants/gameConstants';

const gamesInfo = (state = [], action) => {
    if (action.type === gameConstants.GAMES_INFO_INITIALIZATION) {
        return action.payload || [];
    }
    return state;
};

const initialGameInfoState = {
    gameId: null,
    levelInfos: []
};

const gameInfo = (state = initialGameInfoState, action) => {
    switch (action.type) {
        case gameConstants.GAME_INFO_INITIALIZATION:
            return {
                gameId: action.payload.gameId || null,
                levelInfos: action.payload.levelInfos || []
            };
        case gameConstants.GAME_INFO_CLEARING:
            return initialGameInfoState;
        default:
            return state;
    }
};

const initialGameLevelState = {
    levelId: null,
    wordTranslations: []
};

const gameLevel = (state = initialGameLevelState, action) => {
    switch (action.type) {
        case gameConstants.GAME_LEVEL_INITIALIZATION:
            return {
                levelId: action.payload.levelId || null,
                wordTranslations: action.payload.wordTranslations || []
            };;
        case gameConstants.GAME_LEVEL_CLEARING:
            return initialGameLevelState;
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
