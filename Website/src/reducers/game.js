import { combineReducers } from 'redux';
import gameConstants from '../constants/gameConstants';

const gamesInfo = (state = [], action) => {
    switch (action.type) {
        case gameConstants.GAMES_INFO_INITIALIZATION:
            return action.payload || [];
        case gameConstants.GAMES_INFO_UPDATE_AFTER_ADDITION:
            return state.concat(action.payload);
        case gameConstants.GAMES_INFO_UPDATE_AFTER_DELETION:
            return state.filter(gameInfo => gameInfo.gameId !== action.payload);
        default:
            return state;
    }
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
        case gameConstants.GAME_INFO_UPDATE:
            return {
                ...state,
                levelInfos: state.levelInfos.map(levelInfo => {
                    return levelInfo.levelId !== action.payload.levelId ?
                        levelInfo : {
                            ...levelInfo,
                            playerStars: action.payload.score
                        }
                })
            };
        default:
            return state;
    }
};

const initialGameLevelState = {
    levelId: null,
    wordTranslations: []
};

const gameLevel = (state = initialGameLevelState, action) => {
    if (action.type === gameConstants.GAME_LEVEL_INITIALIZATION) {
        return {
            levelId: action.payload.levelId || null,
            wordTranslations: action.payload.wordTranslations || []
        };
    }
    return state;
};

const game = combineReducers({
    gamesInfo,
    gameInfo,
    gameLevel
});

export default game;
