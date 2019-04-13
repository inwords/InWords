package com.dreamproject.inwords.data.repository.game

import android.annotation.SuppressLint
import com.dreamproject.inwords.core.util.SchedulersFacade
import com.dreamproject.inwords.data.dto.game.*
import com.dreamproject.inwords.data.source.database.game.GameDao
import com.dreamproject.inwords.data.source.database.game.GameInfoDao
import com.dreamproject.inwords.data.source.database.game.GameLevelDao
import com.dreamproject.inwords.domain.model.Resource
import io.reactivex.Observable
import io.reactivex.Single
import javax.inject.Inject

@SuppressLint("UseSparseArrays")
class GameGatewayControllerImpl @Inject constructor(
        private val gameRemoteRepository: GameRemoteRepository,
        private val gameInfoDao: GameInfoDao,
        private val gameDao: GameDao,
        private val gameLevelDao: GameLevelDao) : GameGatewayController {

    private val gameInfoDatabaseRepository by lazy { GameDatabaseRepository<GameInfo>(gameInfoDao) }
    private val gameDatabaseRepository by lazy { GameDatabaseRepository<Game>(gameDao) }
    private val gameLevelDatabaseRepository by lazy { GameDatabaseRepository<GameLevel>(gameLevelDao) }

    private val gamesInfoCachingProvider by lazy { createGamesInfoCachingProvider() }
    private val gameCachingProviderLocator by lazy { ResourceCachingProvider.Locator<Game>() }
    private val gameLevelCachingProviderLocator by lazy { ResourceCachingProvider.Locator<GameLevel>() }

    override fun getGamesInfo(forceUpdate: Boolean): Observable<Resource<List<GameInfo>>> {
        if (forceUpdate) {
            gamesInfoCachingProvider.askForContentUpdate()
        }

        return gamesInfoCachingProvider.observe()
    }

    override fun getGame(gameId: Int, forceUpdate: Boolean): Observable<Resource<Game>> {
        if (forceUpdate) {
            gamesInfoCachingProvider.askForContentUpdate()
        }

        val cachingProvider = gameCachingProviderLocator.get(gameId) { createGameCachingProvider(gameId) }

        return cachingProvider.observe()
    }

    override fun getLevel(levelId: Int, forceUpdate: Boolean): Observable<Resource<GameLevel>> {
        if (forceUpdate) {
            gamesInfoCachingProvider.askForContentUpdate()
        }

        val cachingProvider = gameLevelCachingProviderLocator.get(levelId) { createGameLevelCachingProvider(levelId) }

        return cachingProvider.observe()
    }

    override fun getScore(game: Game, levelId: Int, openingQuantity: Int): Single<LevelScore> {
        return gameRemoteRepository.getScore(LevelScoreRequest(levelId, openingQuantity))
                .doOnSuccess { updateLocalScore(game, levelId) }
                .doOnError {
                    //TODO store local
                }
                .subscribeOn(SchedulersFacade.io())
    }

    private fun updateLocalScore(game: Game, levelId: Int) {
        val list = game.gameLevelInfos.map {
            if (it.levelId == levelId) {
                it.copy(playerStars = 3)
            }
            it
        }

        val updatedGame = game.copy(gameLevelInfos = list)

        val cachingProvider = gameCachingProviderLocator.get(updatedGame.gameId) { createGameCachingProvider(updatedGame.gameId) }

        cachingProvider.postOnLoopback(updatedGame)
    }

    private fun createGamesInfoCachingProvider(): ResourceCachingProvider<List<GameInfo>> {
        return ResourceCachingProvider(
                { data -> gameInfoDatabaseRepository.insertAll(data).map { data } },
                { gameInfoDatabaseRepository.getAll() },
                { gameRemoteRepository.getGameInfos() }
        )
    }

    private fun createGameCachingProvider(gameId: Int): ResourceCachingProvider<Game> {
        return ResourceCachingProvider(
                { data -> gameDatabaseRepository.insertAll(listOf(data)).map { data } },
                { gameDatabaseRepository.getById(gameId) },
                { gameRemoteRepository.getGame(gameId) }
        )
    }

    private fun createGameLevelCachingProvider(levelId: Int): ResourceCachingProvider<GameLevel> {
        return ResourceCachingProvider(
                { data -> gameLevelDatabaseRepository.insertAll(listOf(data)).map { data } },
                { gameLevelDatabaseRepository.getById(levelId) },
                { gameRemoteRepository.getLevel(levelId) }
        )
    }
}

