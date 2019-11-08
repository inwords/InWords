package ru.inwords.inwords.game.domain.interactor

import io.mockk.every
import io.mockk.mockk
import io.reactivex.Observable
import org.junit.jupiter.api.Test
import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.game.data.bean.Game
import ru.inwords.inwords.game.data.bean.GameLevelInfo
import ru.inwords.inwords.game.data.repository.GameGatewayController
import ru.inwords.inwords.game.domain.model.ContinueGameQueryResult
import ru.inwords.inwords.game.domain.model.GameInfoModel
import ru.inwords.inwords.game.domain.model.GamesInfoModel

internal class ContinueGameInteractorTest {

    private val gameGatewayController = mockk<GameGatewayController> { GameGatewayController::class.java }

    private val continueGameInteractor = ContinueGameInteractor(gameGatewayController)

    private val gameInfos = listOf(
        GameInfoModel(1, 0, "", "", available = true, isCustom = false),
        GameInfoModel(2, 0, "", "", available = true, isCustom = false),
        GameInfoModel(3, 0, "", "", available = true, isCustom = false),
        GameInfoModel(4, 0, "", "", available = true, isCustom = false),
        GameInfoModel(5, 0, "", "", available = true, isCustom = false)
    )

    private val gamesInfoModel = GamesInfoModel(true, gameInfos)

    private val gameLevelInfos = listOf(
        GameLevelInfo(1, 1, 0, true),
        GameLevelInfo(2, 2, 0, true),
        GameLevelInfo(3, 3, 0, true)
    )

    private val game = Game(1, "", "", gameLevelInfos)

    @Test
    fun `queryContinueGame should return next level not last when has so`() {
        every { gameGatewayController.getGamesInfo() } returns Observable.just(Resource.Success(gamesInfoModel))

        val result = continueGameInteractor.queryContinueGame(game, gameLevelInfos.first())

        assert(result is Resource.Success)
        assert((result as Resource.Success).data is ContinueGameQueryResult.NextLevelInfo)
        assert((result.data as ContinueGameQueryResult.NextLevelInfo).levelInfo == gameLevelInfos[1])
        assert(!(result.data as ContinueGameQueryResult.NextLevelInfo).isLast)
    }

    @Test
    fun `queryContinueGame should return next level with last when pre last`() {
        every { gameGatewayController.getGamesInfo() } returns Observable.just(Resource.Success(gamesInfoModel))

        val result = continueGameInteractor.queryContinueGame(game, gameLevelInfos[1])

        assert(result is Resource.Success)
        assert((result as Resource.Success).data is ContinueGameQueryResult.NextLevelInfo)
        assert((result.data as ContinueGameQueryResult.NextLevelInfo).levelInfo == gameLevelInfos[2])
        assert((result.data as ContinueGameQueryResult.NextLevelInfo).isLast)
    }

    @Test
    fun `queryContinueGame should return next game when has no more levels and has game`() {
        every { gameGatewayController.getGamesInfo() } returns Observable.just(Resource.Success(gamesInfoModel))

        val result = continueGameInteractor.queryContinueGame(game, gameLevelInfos.last())

        assert(result is Resource.Success)
        assert((result as Resource.Success).data is ContinueGameQueryResult.NextGameInfo)
        assert((result.data as ContinueGameQueryResult.NextGameInfo).nextGameInfo.gameId == 2)
    }

    @Test
    fun `queryContinueGame should return next game when has no more levels and has not game`() {
        every { gameGatewayController.getGamesInfo() } returns Observable.just(Resource.Success(gamesInfoModel))

        val result = continueGameInteractor.queryContinueGame(game.copy(gameId = 5), gameLevelInfos.last())

        assert(result is Resource.Success)
        assert((result as Resource.Success).data is ContinueGameQueryResult.NoMoreGames)
    }
}