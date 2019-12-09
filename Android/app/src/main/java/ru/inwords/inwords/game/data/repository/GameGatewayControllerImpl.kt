package ru.inwords.inwords.game.data.repository

import android.util.Log
import io.reactivex.Completable
import io.reactivex.Observable
import io.reactivex.Single
import ru.inwords.inwords.core.managers.ResourceManager
import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.core.resource.ResourceCachingProvider
import ru.inwords.inwords.core.resource.Source
import ru.inwords.inwords.core.resource.wrapResource
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import ru.inwords.inwords.game.data.bean.*
import ru.inwords.inwords.game.data.converter.LevelResultConverter
import ru.inwords.inwords.game.data.deferred.level_score.LevelScoreDeferredUploaderHolder
import ru.inwords.inwords.game.data.repository.custom_game.CUSTOM_GAME_ID
import ru.inwords.inwords.game.data.repository.custom_game.withUpdatedLevelScore
import ru.inwords.inwords.game.data.source.GameDao
import ru.inwords.inwords.game.data.source.GameInfoDao
import ru.inwords.inwords.game.data.source.GameLevelDao
import ru.inwords.inwords.game.domain.converter.GameDomainConverter
import ru.inwords.inwords.game.domain.converter.GamesInfoDomainConverter
import ru.inwords.inwords.game.domain.model.GameModel
import ru.inwords.inwords.game.domain.model.GamesInfoModel
import ru.inwords.inwords.game.domain.model.LevelResultModel
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class GameGatewayControllerImpl @Inject constructor(
    resourceManager: ResourceManager,
    private val gameRemoteRepository: GameRemoteRepository,
    gameInfoDao: GameInfoDao,
    gameDao: GameDao,
    gameLevelDao: GameLevelDao,
    private val levelScoreDeferredUploaderHolder: LevelScoreDeferredUploaderHolder
) : GameGatewayController, CustomGameGatewayController {

    private val gameInfoDatabaseRepository by lazy { GameDatabaseRepository<GameInfo>(gameInfoDao) }
    private val gameDatabaseRepository by lazy { GameDatabaseRepository<Game>(gameDao) }
    private val gameLevelDatabaseRepository by lazy { GameDatabaseRepository<GameLevel>(gameLevelDao) }

    private val gamesInfoCachingProviderLocator by lazy { ResourceCachingProvider.Locator { createGamesInfoCachingProvider() } }
    private val gameCachingProviderLocator by lazy { ResourceCachingProvider.Locator { createGameCachingProvider(it) } }
    private val gameLevelCachingProviderLocator by lazy { ResourceCachingProvider.Locator { createGameLevelCachingProvider(it) } }

    private val gameDomainConverter = GameDomainConverter()
    private val gamesInfoDomainConverter = GamesInfoDomainConverter(resourceManager)
    private val wordOpenCountsConverter = LevelResultConverter()

    override fun getGamesInfo(forceUpdate: Boolean): Observable<Resource<GamesInfoModel>> {
        val cachingProvider = gamesInfoCachingProviderLocator.getDefault()

        return cachingProvider.observe(forceUpdate)
            .map { gamesInfoDomainConverter.convert(it) }
    }

    override fun storeGameInfo(gameInfo: GameInfo): Completable {
        val cachingProvider = gamesInfoCachingProviderLocator.getDefault()

        return gameInfoDatabaseRepository.insertAll(listOf(gameInfo))
            .doOnSuccess { cachingProvider.askForContentUpdate() }
            .ignoreElement() //TODO think of ignore
    }

    override fun getGame(gameId: Int, forceUpdate: Boolean): Observable<Resource<GameModel>> {
        return if (gameId == CUSTOM_GAME_ID) {
            getGameLocal(gameId).toObservable()
        } else {
            gameCachingProviderLocator.get(gameId).observe(forceUpdate)
        }
            .map { gameDomainConverter.convert(it) }
    }

    private fun getGameLocal(gameId: Int): Single<Resource<Game>> {
        return gameDatabaseRepository.getById(gameId).wrapResource(Source.CACHE)
    }

    override fun storeGame(game: Game): Completable {
        return gameDatabaseRepository.insertAll(listOf(game)).ignoreElement() //TODO think of ignore
    }

    override fun getLevel(levelId: Int, forceUpdate: Boolean): Observable<Resource<GameLevel>> {
        return if (levelId < 0) {
            getLevelLocal(levelId).toObservable()
        } else {
            gameLevelCachingProviderLocator.get(levelId).observe(forceUpdate)
        }
    }

    private fun getLevelLocal(levelId: Int): Single<Resource<GameLevel>> {
        return gameLevelDatabaseRepository.getById(levelId).wrapResource(Source.CACHE)
    }

    override fun storeLevel(gameLevel: GameLevel): Completable {
        return gameLevelDatabaseRepository.insertAll(listOf(gameLevel)).ignoreElement() //TODO think of ignore
    }

    override fun getScore(game: Game, levelResultModel: LevelResultModel): Single<Resource<LevelScore>> {
        val levelScoreRequest = wordOpenCountsConverter.convert(levelResultModel)

        return levelScoreDeferredUploaderHolder.request(levelScoreRequest) { res ->
            gameCachingProviderLocator.get(game.gameId)
                .postOnLoopback(game.withUpdatedLevelScore(levelId = res.data.levelId, newScore = res.data.score))
        }
            .subscribeOn(SchedulersFacade.io())
    }

    override fun uploadScoresToServer(): Single<List<LevelScoreRequest>> {
        return levelScoreDeferredUploaderHolder.tryUploadDataToRemote()
    }

    override fun clearCache() {
        gamesInfoCachingProviderLocator.clear()
        gameCachingProviderLocator.clear()
        gameLevelCachingProviderLocator.clear()
    }

    private fun createGamesInfoCachingProvider(): ResourceCachingProvider<List<GameInfo>> {
        return ResourceCachingProvider(
            { data -> gameInfoDatabaseRepository.insertAll(data).map { data } },
            { gameInfoDatabaseRepository.getAll().map { gameInfos -> gameInfos.filter { it.gameId != CUSTOM_GAME_ID } } }, //TODO remove this filter
            { gameRemoteRepository.getGameInfos() },
            prefetchFromDatabase = true
        )
    }

    private fun createGameCachingProvider(gameId: Int): ResourceCachingProvider<Game> {
        return ResourceCachingProvider(
            { data -> gameDatabaseRepository.insertAll(listOf(data)).map { data } },
            { gameDatabaseRepository.getById(gameId) },
            {
                uploadScoresToServer()
                    .ignoreElement()
                    .doOnError { Log.e(javaClass.simpleName, it.message.orEmpty()) }
                    .onErrorComplete()
                    .andThen(gameRemoteRepository.getGame(gameId))
            },
            prefetchFromDatabase = true
        )
    }

    private fun createGameLevelCachingProvider(levelId: Int): ResourceCachingProvider<GameLevel> {
        return ResourceCachingProvider(
            { data -> gameLevelDatabaseRepository.insertAll(listOf(data)).map { data } },
            { gameLevelDatabaseRepository.getById(levelId) },
            { gameRemoteRepository.getLevel(levelId) },
            prefetchFromDatabase = true
        )
    }

    companion object {
        const val TAG: String = "GameGatewayController"
    }
}