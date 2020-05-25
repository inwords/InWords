package ru.inwords.inwords.game.data.repository

import android.util.Log
import io.reactivex.Completable
import io.reactivex.Observable
import io.reactivex.Single
import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.core.resource.ResourceCachingProvider
import ru.inwords.inwords.core.resource.Source
import ru.inwords.inwords.core.resource.wrapResource
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import ru.inwords.inwords.game.converter.GameEntityConverter
import ru.inwords.inwords.game.converter.GameInfoConverter
import ru.inwords.inwords.game.converter.GamesInfoDomainConverter
import ru.inwords.inwords.game.converter.LevelMetricConverter
import ru.inwords.inwords.game.data.converter.TrainingMetricConverter
import ru.inwords.inwords.game.data.deferred.level_score.LevelScoreDeferredUploaderHolder
import ru.inwords.inwords.game.data.entity.GameEntity
import ru.inwords.inwords.game.data.entity.GameInfoEntity
import ru.inwords.inwords.game.data.entity.GameLevelEntity
import ru.inwords.inwords.game.data.repository.custom_game.CUSTOM_GAME_ID
import ru.inwords.inwords.game.data.repository.custom_game.withUpdatedLevelScore
import ru.inwords.inwords.game.data.source.GameDao
import ru.inwords.inwords.game.data.source.GameInfoDao
import ru.inwords.inwords.game.data.source.GameLevelDao
import ru.inwords.inwords.game.domain.model.*

class GameGatewayControllerImpl(
    private val gameRemoteRepository: GameRemoteRepository,
    gameInfoDao: GameInfoDao,
    gameDao: GameDao,
    gameLevelDao: GameLevelDao,
    private val levelScoreDeferredUploaderHolder: LevelScoreDeferredUploaderHolder
) : GameGatewayController, CustomGameGatewayController, GetGameGameGatewayController {

    private val gameInfoDatabaseRepository = GameDatabaseRepository<GameInfoEntity>(gameInfoDao)
    private val gameDatabaseRepository = GameDatabaseRepository<GameEntity>(gameDao)
    private val gameLevelDatabaseRepository = GameDatabaseRepository<GameLevelEntity>(gameLevelDao)

    private val gamesInfoCachingProviderLocator = ResourceCachingProvider.Locator { createGamesInfoCachingProvider() }
    private val gameCachingProviderLocator = ResourceCachingProvider.Locator { createGameCachingProvider(it) }
    private val gameLevelCachingProviderLocator = ResourceCachingProvider.Locator { createGameLevelCachingProvider(it) }

    private val gameConverter = GameEntityConverter()
    private val gameInfoConverter = GameInfoConverter()
    private val gamesInfoDomainConverter = GamesInfoDomainConverter()
    private val trainingMetricConverter = TrainingMetricConverter(LevelMetricConverter())

    override fun getGamesInfo(forceUpdate: Boolean): Observable<Resource<GamesInfo>> {
        val cachingProvider = gamesInfoCachingProviderLocator.getDefault()

        return cachingProvider.observe(forceUpdate)
            .map { gamesInfoDomainConverter.convert(gameInfoConverter.convertResourceList(it)) }
    }

    override fun storeGameInfo(gameInfo: GameInfo): Completable {
        val cachingProvider = gamesInfoCachingProviderLocator.getDefault()

        return gameInfoDatabaseRepository.insertAll(listOf(gameInfoConverter.reverse(gameInfo)))
            .doOnSuccess { cachingProvider.askForDatabaseContent() }
            .ignoreElement() //TODO think of ignore
    }

    override fun getGame(gameId: Int, forceUpdate: Boolean): Observable<Resource<Game>> {
        return if (gameId == CUSTOM_GAME_ID) {
            getGameLocal(gameId).toObservable()
        } else {
            gameCachingProviderLocator.get(gameId).observe(forceUpdate).map { gameConverter.convert(it) }
        }
    }

    private fun getGameLocal(gameId: Int): Single<Resource<Game>> {
        return gameDatabaseRepository.getById(gameId).map { gameConverter.convert(it) }.wrapResource(Source.CACHE)
    }

    override fun storeGame(game: Game): Completable {
        return gameDatabaseRepository.insertAll(listOf(gameConverter.reverse(game))).ignoreElement() //TODO think of ignore
    }

    override fun getLevel(levelId: Int, forceUpdate: Boolean): Observable<Resource<GameLevelEntity>> {
        return if (levelId < 0) {
            getLevelLocal(levelId).toObservable()
        } else {
            gameLevelCachingProviderLocator.get(levelId).observe(forceUpdate)
        }
    }

    private fun getLevelLocal(levelId: Int): Single<Resource<GameLevelEntity>> {
        return gameLevelDatabaseRepository.getById(levelId).wrapResource(Source.CACHE)
    }

    override fun storeLevel(gameLevelEntity: GameLevelEntity): Completable {
        return gameLevelDatabaseRepository.insertAll(listOf(gameLevelEntity)).ignoreElement() //TODO think of ignore
    }

    override fun getScore(game: Game, trainingMetric: TrainingMetric): Single<Resource<TrainingScore>> {
        val trainingMetricEntity = trainingMetricConverter.convert(trainingMetric)

        return levelScoreDeferredUploaderHolder.request(trainingMetricEntity) { res ->
            gameCachingProviderLocator.get(game.gameId)
                .postOnLoopback(
                    gameConverter.reverse(
                        game.withUpdatedLevelScore(levelId = res.data.levelId, newScore = res.data.score)
                    )
                )
        }
            .subscribeOn(SchedulersFacade.io())
    }

    override fun uploadScoresToServer(): Single<List<TrainingScore>> {
        return levelScoreDeferredUploaderHolder.tryUploadDataToRemote().toSingle(emptyList())
    }

    override fun addWordsToUserDictionary(gameId: Int) = gameRemoteRepository.addWordsToUserDictionary(gameId)

    override fun clearCache() {
        gamesInfoCachingProviderLocator.clear()
        gameCachingProviderLocator.clear()
        gameLevelCachingProviderLocator.clear()
    }

    private fun createGamesInfoCachingProvider(): ResourceCachingProvider<List<GameInfoEntity>> {
        return ResourceCachingProvider(
            { data -> gameInfoDatabaseRepository.insertAll(data).map { data } },
            { gameInfoDatabaseRepository.getAll().map { gameInfos -> gameInfos.filter { it.gameId != CUSTOM_GAME_ID } } }, //TODO remove this filter
            { gameRemoteRepository.getGameInfos() },
            prefetchFromDatabase = true
        )
    }

    private fun createGameCachingProvider(gameId: Int): ResourceCachingProvider<GameEntity> {
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

    private fun createGameLevelCachingProvider(levelId: Int): ResourceCachingProvider<GameLevelEntity> {
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