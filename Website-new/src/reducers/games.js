import { combineReducers } from 'redux';
import gamesConstants from '../constants/gamesConstants';

const gamesInfo = (state = [], action) => {
    switch (action.type) {
        case gamesConstants.INITIALIZE_GAMES_INFO:
            return action.payload || [];
        default:
            return state;
    }
};

const initialGameInfoState = {
    gameId: null,
    levelsInfo: []
};

const gameInfo = (state = initialGameInfoState, action) => {
    switch (action.type) {
        case gamesConstants.INITIALIZE_GAME_INFO:
            return {
                gameId: action.payload.gameId || null,
                levelsInfo: action.payload.levelInfos || []
            };
        /*case gamesConstants.UPDATE_GAME_INFO:
            return {
                ...state,
                levelInfos: state.levelInfos.map(levelInfo => {
                    return levelInfo.levelId !== action.payload.levelId ?
                        levelInfo : {
                            ...levelInfo,
                            playerStars: action.payload.score
                        }
                })
            };*/
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
        case gamesConstants.INITIALIZE_GAME_LEVEL:
            return {
                levelId: action.payload.levelId || null,
                wordTranslations: action.payload.wordTranslations || []
            };
        /*case gamesConstants.GAME_LEVEL_UPDATE_AFTER_RESULT_SAVING:
            return {
                ...state,
                lastScore: action.payload.score
            };
        case gamesConstants.GAME_LEVEL_SCORE_RESET:
            return {
                ...state,
                lastScore: null
            };*/
        default:
            return state;
    }
};

const games = combineReducers({
    gamesInfo,
    gameInfo,
    gameLevel
});

export default games;
