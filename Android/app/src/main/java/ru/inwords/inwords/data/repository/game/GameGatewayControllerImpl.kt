package ru.inwords.inwords.data.repository.game

import android.annotation.SuppressLint
import android.util.Log
import io.reactivex.Observable
import io.reactivex.Single
import ru.inwords.inwords.core.util.SchedulersFacade
import ru.inwords.inwords.data.dto.game.*
import ru.inwords.inwords.data.repository.ResourceCachingProvider
import ru.inwords.inwords.data.repository.wrapResource
import ru.inwords.inwords.data.source.database.game.GameDao
import ru.inwords.inwords.data.source.database.game.GameInfoDao
import ru.inwords.inwords.data.source.database.game.GameLevelDao
import ru.inwords.inwords.data.source.database.game.LevelScoreRequestDao
import ru.inwords.inwords.domain.model.Resource
import java.util.*
import javax.inject.Inject

@SuppressLint("UseSparseArrays")
class GameGatewayControllerImpl @Inject constructor(
        private val gameRemoteRepository: GameRemoteRepository,
        gameInfoDao: GameInfoDao,
        gameDao: GameDao,
        gameLevelDao: GameLevelDao,
        private val levelScoreRequestDao: LevelScoreRequestDao) : GameGatewayController {

    private val gameInfoDatabaseRepository by lazy { GameDatabaseRepository<GameInfo>(gameInfoDao) }
    private val gameDatabaseRepository by lazy { GameDatabaseRepository<Game>(gameDao) }
    private val gameLevelDatabaseRepository by lazy { GameDatabaseRepository<GameLevel>(gameLevelDao) }

    private val gamesInfoCachingProviderLocator by lazy { ResourceCachingProvider.Locator { createGamesInfoCachingProvider() } }
    private val gameCachingProviderLocator by lazy { ResourceCachingProvider.Locator { createGameCachingProvider(it) } }
    private val gameLevelCachingProviderLocator by lazy { ResourceCachingProvider.Locator { createGameLevelCachingProvider(it) } }

    override fun getGamesInfo(forceUpdate: Boolean): Observable<Resource<List<GameInfo>>> {
        val cachingProvider = gamesInfoCachingProviderLocator.getDefault()

        return cachingProvider.observe(forceUpdate)
    }

    override fun getGame(gameId: Int, forceUpdate: Boolean): Observable<Resource<Game>> {
        val cachingProvider = gameCachingProviderLocator.get(gameId)

        return cachingProvider.observe(forceUpdate)
    }

    override fun getLevel(levelId: Int, forceUpdate: Boolean): Observable<Resource<GameLevel>> {
        val cachingProvider = gameLevelCachingProviderLocator.get(levelId)

        return cachingProvider.observe(forceUpdate)
    }

    override fun getScore(game: Game, levelScoreRequest: LevelScoreRequest): Single<Resource<LevelScore>> {
        return gameRemoteRepository.getScore(levelScoreRequest).wrapResource()
                .flatMap { res ->
                    if (res is Resource.Error) {
                        levelScoreRequestDao.insert(levelScoreRequest)
                                .doOnError { Log.d(TAG, it.message) }
                                .map { res }
                                .onErrorReturn { res }
                    } else {
                        if (res is Resource.Success) {
                            updateLocalScore(game, listOf(res.data))
                        }
                        Single.just(res)
                    }
                }
                .subscribeOn(SchedulersFacade.io())
    }

    override fun uploadScoresToServer(): Single<List<LevelScoreRequest>> {
        return levelScoreRequestDao.getAllScores()
                .filter { it.isNotEmpty() }
                .flatMapSingle { levelScores -> gameRemoteRepository.uploadScore(levelScores).map { levelScores } }
                .flatMap { levelScores -> levelScoreRequestDao.deleteAll().map { levelScores } }
                .onErrorResumeNext { t ->
                    if (t is NoSuchElementException) { //skip error if it is because of filter
                        Single.just(emptyList())
                    } else {
                        Single.error(t)
                    }
                }
    }

    override fun clearCache() {
        gamesInfoCachingProviderLocator.clear()
        gameCachingProviderLocator.clear()
        gameLevelCachingProviderLocator.clear()
    }

    private fun updateLocalScore(game: Game, levelScores: List<LevelScore>) {
        val list = game.gameLevelInfos.map {
            for (levelScore in levelScores) {
                if (it.levelId == levelScore.levelId) {
                    return@map it.copy(playerStars = levelScore.score)
                }
            }

            it
        }

        val updatedGame = game.copy(gameLevelInfos = list)

        val cachingProvider = gameCachingProviderLocator.get(updatedGame.gameId)

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
                {
                    uploadScoresToServer()
                            .ignoreElement()
                            .onErrorComplete()
                            .andThen(gameRemoteRepository.getGame(gameId))
                }
        )
    }

    private fun createGameLevelCachingProvider(levelId: Int): ResourceCachingProvider<GameLevel> {
        return ResourceCachingProvider(
                { data -> gameLevelDatabaseRepository.insertAll(listOf(data)).map { data } },
                { gameLevelDatabaseRepository.getById(levelId) },
                { gameRemoteRepository.getLevel(levelId) }
        )
    }

    companion object {
        const val TAG: String = "GameGatewayController"
    }
}

