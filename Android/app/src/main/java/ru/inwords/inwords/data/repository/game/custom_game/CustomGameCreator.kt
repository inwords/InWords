package ru.inwords.inwords.data.repository.game.custom_game

import io.reactivex.Completable
import ru.inwords.inwords.core.Resource
import ru.inwords.inwords.core.util.SchedulersFacade
import ru.inwords.inwords.data.dto.WordTranslation
import ru.inwords.inwords.data.dto.game.Game
import ru.inwords.inwords.data.dto.game.GameInfo
import ru.inwords.inwords.data.dto.game.GameLevel
import ru.inwords.inwords.data.dto.game.GameLevelInfo
import ru.inwords.inwords.data.repository.game.CustomGameGatewayController
import javax.inject.Inject

class CustomGameCreator @Inject constructor(private val customGameGatewayController: CustomGameGatewayController,
                                            private val levelInfoGenerator: LevelInfoGenerator) : GameCreator {
    /**
     * Creates custom game (stores it in database)
     *
     * @return id of created game
     */
    override fun createLevel(wordTranslations: List<WordTranslation>): GameLevelInfo {
        val gameInfo = GameInfo(CUSTOM_GAME_ID, CUSTOM_GAME_ID, "CUSTOM_GAME", "CUSTOM_GAME", true)

        val defaultGame = Game(CUSTOM_GAME_ID, "CUSTOM_GAME", "CUSTOM_GAME", listOf())

        val game = when (val gameResource = customGameGatewayController.getGame(CUSTOM_GAME_ID, false).blockingFirst()) {
            is Resource.Success -> gameResource.data.game
            else -> defaultGame
        }

        val lastGameLevelInfo = game.gameLevelInfos.lastOrNull()

        val newGameLevelInfo = GameLevelInfo(
                levelInfoGenerator.getNextLevelId(lastGameLevelInfo),
                levelInfoGenerator.getNextLevelNumber(lastGameLevelInfo),
                0,
                true
        )

        val newGameLevel = GameLevel(newGameLevelInfo.levelId, wordTranslations)

        val newGame = game.copy(gameLevelInfos = game.gameLevelInfos.toMutableList().apply { add(newGameLevelInfo) })

        Completable.mergeDelayError(listOf(
                customGameGatewayController.storeGameInfo(gameInfo).subscribeOn(SchedulersFacade.io()),
                customGameGatewayController.storeGame(newGame).subscribeOn(SchedulersFacade.io()),
                customGameGatewayController.storeLevel(newGameLevel).subscribeOn(SchedulersFacade.io())
        )).blockingAwait()

        return newGameLevelInfo
    }
}

const val CUSTOM_GAME_ID = -2