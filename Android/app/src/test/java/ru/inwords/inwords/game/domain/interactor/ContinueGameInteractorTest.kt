package ru.inwords.inwords.game.domain.interactor

import io.mockk.*
import io.reactivex.Observable
import io.reactivex.Single
import org.junit.jupiter.api.Test
import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.game.data.repository.GameGatewayController
import ru.inwords.inwords.game.data.repository.custom_game.GameCreator
import ru.inwords.inwords.game.domain.model.*
import ru.inwords.inwords.game.domain.model.TrainingStrategy.TrainingMode
import ru.inwords.inwords.translation.domain.interactor.TrainingInteractor
import ru.inwords.inwords.translation.domain.model.WordTranslation

internal class ContinueGameInteractorTest {

    private val gameGatewayController = mockk<GameGatewayController> { GameGatewayController::class.java }

    private val trainingInteractor = mockk<TrainingInteractor> { TrainingInteractor::class.java }
    private val gameCreator = mockk<GameCreator> { GameCreator::class.java }

    private val continueGameInteractor = ContinueGameInteractor(gameGatewayController, trainingInteractor, gameCreator)

    private val gameInfos = listOf(
        GameInfo(1, "", "", "", available = true, isCustom = false),
        GameInfo(2, "", "", "", available = true, isCustom = false),
        GameInfo(3, "", "", "", available = true, isCustom = false),
        GameInfo(4, "", "", "", available = true, isCustom = false),
        GameInfo(5, "", "", "", available = true, isCustom = false)
    )

    private val gamesInfoModel = GamesInfo(true, gameInfos)

    private val gameLevelInfos1 = listOf(
        GameLevelInfo(1, 1, 0, true),
        GameLevelInfo(2, 2, 0, true),
        GameLevelInfo(3, 3, 0, true)
    )

    private val gameLevelInfos2 = listOf(
        GameLevelInfo(1, 1, 0, true),
        GameLevelInfo(2, 2, 0, true),
        GameLevelInfo(3, 3, 0, true)
    )

    private val game1 = Game(1, gameLevelInfos1)
    private val game2 = Game(2, gameLevelInfos2)
    private val game3 = Game(3, emptyList())

    @Test
    fun `queryContinueGame should return next level not last when has so`() {
        every { gameGatewayController.getGamesInfo() } returns Observable.just(Resource.Success(gamesInfoModel))

        val result = continueGameInteractor.queryContinueGame(game1, gameLevelInfos1.first(), TrainingMode.WORD_SETS)

        assert(result is Resource.Success)
        assert((result as Resource.Success).data is ContinueGameQueryResult.NextLevelInfo)
        assert((result.data as ContinueGameQueryResult.NextLevelInfo).levelInfo == gameLevelInfos1[1])
        assert(!(result.data as ContinueGameQueryResult.NextLevelInfo).isLast)
    }

    @Test
    fun `queryContinueGame should return next level with last when pre last`() {
        every { gameGatewayController.getGamesInfo() } returns Observable.just(Resource.Success(gamesInfoModel))

        val result = continueGameInteractor.queryContinueGame(game1, gameLevelInfos1[1], TrainingMode.WORD_SETS)

        assert(result is Resource.Success)
        assert((result as Resource.Success).data is ContinueGameQueryResult.NextLevelInfo)
        assert((result.data as ContinueGameQueryResult.NextLevelInfo).levelInfo == gameLevelInfos1[2])
        assert((result.data as ContinueGameQueryResult.NextLevelInfo).isLast)
    }

    @Test
    fun `queryContinueGame should return next game first level when has no more levels and has game`() {
        every { gameGatewayController.getGamesInfo() } returns Observable.just(Resource.Success(gamesInfoModel))
        every { gameGatewayController.getGame(game2.gameId, false) } returns Observable.just(Resource.Success(game2))

        val result = continueGameInteractor.queryContinueGame(game1, gameLevelInfos1.last(), TrainingMode.WORD_SETS)

        assert(result is Resource.Success)
        assert((result as Resource.Success).data is ContinueGameQueryResult.NextLevelInfo)
        assert((result.data as ContinueGameQueryResult.NextLevelInfo).levelInfo == gameLevelInfos2[0])
        assert((result.data as ContinueGameQueryResult.NextLevelInfo).game.gameId == 2)
    }

    @Test
    fun `queryContinueGame should return no more games when has no more levels and has not game`() {
        every { gameGatewayController.getGamesInfo() } returns Observable.just(Resource.Success(gamesInfoModel))

        val result = continueGameInteractor.queryContinueGame(game1.copy(gameId = 5), gameLevelInfos1.last(), TrainingMode.WORD_SETS)

        assert(result is Resource.Success)
        assert((result as Resource.Success).data is ContinueGameQueryResult.NoMoreLevels)
    }

    @Test
    fun `queryContinueGame should return error when has no more levels and has game with zero levels`() {
        every { gameGatewayController.getGamesInfo() } returns Observable.just(Resource.Success(gamesInfoModel))
        every { gameGatewayController.getGame(game3.gameId, false) } returns Observable.just(Resource.Success(game3))

        val result = continueGameInteractor.queryContinueGame(game2, game2.gameLevelInfos.last(), TrainingMode.WORD_SETS)

        assert(result is Resource.Error)
    }

    @Test
    fun `queryContinueGame in training mode should return no more levels when response is empty`() {
        every { trainingInteractor.getActualWordsForTraining(false) } returns Single.just(emptyList())

        val result = continueGameInteractor.queryContinueGame(game2, game1.gameLevelInfos.last(), TrainingMode.TRAINING)

        assert(result is Resource.Success)
        assert((result as Resource.Success).data is ContinueGameQueryResult.NoMoreLevels)
        verify(exactly = 0) { trainingInteractor.clearCache() }
    }

    @Test
    fun `queryContinueGame in training mode should return next level when response has words`() {
        every { trainingInteractor.getActualWordsForTraining(false) } returns Single.just(
            listOf(
                WordTranslation("1f", "1n"),
                WordTranslation("2f", "2n")
            )
        )
        every { gameCreator.createLevel(any()) } returns game2.gameLevelInfos.first()
        every { trainingInteractor.clearCache() } just runs

        val result = continueGameInteractor.queryContinueGame(game2, game1.gameLevelInfos.last(), TrainingMode.TRAINING)

        assert(result is Resource.Success)
        assert((result as Resource.Success).data is ContinueGameQueryResult.NextLevelInfo)
        verify(exactly = 1) { trainingInteractor.clearCache() }
    }

    @Test
    fun `queryContinueGame in training mode should return error when reposnse is error`() {
        every { trainingInteractor.getActualWordsForTraining(false) } returns Single.error(Throwable())

        val result = continueGameInteractor.queryContinueGame(game2, game1.gameLevelInfos.last(), TrainingMode.TRAINING)

        assert(result is Resource.Error)
        verify(exactly = 0) { trainingInteractor.clearCache() }
    }
}