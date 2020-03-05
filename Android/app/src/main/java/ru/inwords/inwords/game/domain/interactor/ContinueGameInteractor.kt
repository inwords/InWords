package ru.inwords.inwords.game.domain.interactor

import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.game.data.bean.GameLevelInfo
import ru.inwords.inwords.game.data.repository.GameGatewayController
import ru.inwords.inwords.game.domain.model.ContinueGameQueryResult
import ru.inwords.inwords.game.domain.model.Game
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class ContinueGameInteractor @Inject constructor(private val gameGatewayController: GameGatewayController) { //TODO restrict to one method only
    fun queryContinueGame(game: Game, levelInfo: GameLevelInfo): Resource<ContinueGameQueryResult> {
        val gameLevelInfos = game.gameLevelInfos
        val nextLevelIndex = levelInfo.level

        val lastLevelNum = gameLevelInfos.maxBy { it.level }

        val nextLevelInfo = gameLevelInfos.getOrNull(nextLevelIndex)

        return when {
            nextLevelInfo != null -> {
                val isLast = nextLevelInfo.level == lastLevelNum?.level
                Resource.Success(ContinueGameQueryResult.NextLevelInfo(game, nextLevelInfo, isLast = isLast))
            }
            lastLevelNum != null -> {
                return when (val gameInfosResource = gameGatewayController.getGamesInfo().blockingFirst()) {
                    is Resource.Success -> {
                        val nextGameInfoIndex = gameInfosResource.data.gameInfos.indexOfFirst { it.gameId == game.gameId }
                        val nextGameInfo = gameInfosResource.data.gameInfos.getOrNull(nextGameInfoIndex + 1)

                        if (nextGameInfo != null) {
                            Resource.Success(ContinueGameQueryResult.NextGameInfo(nextGameInfo))
                        } else {
                            Resource.Success(ContinueGameQueryResult.NoMoreGames)
                        }
                    }
                    is Resource.Loading -> Resource.Loading()
                    is Resource.Error -> Resource.Error(gameInfosResource.message, gameInfosResource.throwable)
                }
            }
            else -> {
                Resource.Error("", RuntimeException("")) //TODO normal exception
            }
        }
    }

}