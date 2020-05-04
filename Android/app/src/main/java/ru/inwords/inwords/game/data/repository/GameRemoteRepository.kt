package ru.inwords.inwords.game.data.repository

import io.reactivex.Completable
import io.reactivex.Single
import ru.inwords.inwords.data.source.remote.WebRequestsManagerAuthorised
import ru.inwords.inwords.game.converter.WordSetInfoReplyConverter
import ru.inwords.inwords.game.data.converter.*
import ru.inwords.inwords.game.data.entity.GameEntity
import ru.inwords.inwords.game.data.entity.GameInfoEntity
import ru.inwords.inwords.game.data.entity.GameLevelEntity
import ru.inwords.inwords.game.data.entity.LevelMetricEntity
import ru.inwords.inwords.game.domain.model.LevelScore
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class GameRemoteRepository @Inject constructor(private val webRequestsManagerAuthorised: WebRequestsManagerAuthorised) {
    private val wordSetInfoReplyConverter = WordSetInfoReplyConverter()
    private val levelWordReplyConverter = LevelWordConverter()
    private val levelReplyConverter = LevelReplyConverter()

    private val levelPointConverter = LevelPointConverter()
    private val levelMetricEntityToCardGameMetricConverter = LevelMetricEntityToCardGameMetricConverter()
    private val levelMetricEntityToCardGameInfoConverter = LevelMetricEntityToCardGameInfoConverter()

    fun getGameInfos(): Single<List<GameInfoEntity>> {
        return webRequestsManagerAuthorised.getGameInfos()
            .map { wordSetReply -> wordSetInfoReplyConverter.convertList(wordSetReply.wordSetsList) }
    }

    fun getGame(wordSetId: Int): Single<GameEntity> {
        return webRequestsManagerAuthorised.getLevels(wordSetId)
            .map { getLevelsReply -> GameEntity(wordSetId, levelReplyConverter.convertList(getLevelsReply.levelsList)) }
    }

    fun getLevel(levelId: Int): Single<GameLevelEntity> {
        return webRequestsManagerAuthorised.getLevelWords(levelId)
            .map { getLevelWordsReply -> GameLevelEntity(levelId, levelWordReplyConverter.convertList(getLevelWordsReply.wordsList)) }
    }

    fun trainingEstimate(levelMetricEntity: LevelMetricEntity): Single<LevelScore> {
        return trainingEstimate(listOf(levelMetricEntity)).map { it.first() }
    }

    fun trainingEstimate(levelMetricEntities: List<LevelMetricEntity>): Single<List<LevelScore>> {
        return webRequestsManagerAuthorised.estimate(levelMetricEntityToCardGameMetricConverter.convertList(levelMetricEntities))
            .map { levelPoints -> levelPoints.pointsList.map { levelPointConverter.convert(it) } }
    }

    fun save(levelMetricEntity: LevelMetricEntity): Single<LevelScore> {
        return save(listOf(levelMetricEntity)).map { it.first() }
    }

    fun save(levelMetricEntities: List<LevelMetricEntity>): Single<List<LevelScore>> {
        return webRequestsManagerAuthorised.save(levelMetricEntityToCardGameInfoConverter.convertList(levelMetricEntities))
            .map { levelPoints -> levelPoints.pointsList.map { levelPointConverter.convert(it) } }
    }

    fun addWordsToUserDictionary(gameId: Int): Completable {
        return webRequestsManagerAuthorised.addWordSetToDictionary(gameId)
    }
}
