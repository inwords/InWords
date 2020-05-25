package ru.inwords.inwords.game.data.repository

import io.reactivex.Completable
import io.reactivex.Single
import ru.inwords.inwords.game.converter.WordSetInfoReplyConverter
import ru.inwords.inwords.game.data.converter.LevelReplyConverter
import ru.inwords.inwords.game.data.converter.LevelWordConverter
import ru.inwords.inwords.game.data.converter.TrainingMetricEntityToCardGameMetricConverter
import ru.inwords.inwords.game.data.converter.TrainingScoreConverter
import ru.inwords.inwords.game.data.entity.GameEntity
import ru.inwords.inwords.game.data.entity.GameInfoEntity
import ru.inwords.inwords.game.data.entity.GameLevelEntity
import ru.inwords.inwords.game.data.entity.TrainingMetricEntity
import ru.inwords.inwords.game.domain.model.TrainingScore
import ru.inwords.inwords.main_activity.data.source.remote.WebRequestsManagerAuthorised

class GameRemoteRepository internal constructor(private val webRequestsManagerAuthorised: WebRequestsManagerAuthorised) {
    private val wordSetInfoReplyConverter = WordSetInfoReplyConverter()
    private val levelWordReplyConverter = LevelWordConverter()
    private val levelReplyConverter = LevelReplyConverter()

    private val trainingScoreConverter = TrainingScoreConverter()
    private val trainingMetricEntityToCardGameMetricConverter = TrainingMetricEntityToCardGameMetricConverter()

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

    fun trainingEstimate(trainingMetricEntity: TrainingMetricEntity): Single<TrainingScore> {
        return trainingEstimate(listOf(trainingMetricEntity)).map { it.first() }
    }

    fun trainingEstimate(trainingMetricEntities: List<TrainingMetricEntity>): Single<List<TrainingScore>> {
        return webRequestsManagerAuthorised.estimate(trainingMetricEntityToCardGameMetricConverter.convertList(trainingMetricEntities))
            .map { reply -> reply.scoresList.map { trainingScoreConverter.convert(it) } }
    }

    fun save(trainingMetricEntity: TrainingMetricEntity): Single<TrainingScore> {
        return trainingEstimate(trainingMetricEntity)
    }

    fun save(trainingMetricEntities: List<TrainingMetricEntity>): Single<List<TrainingScore>> {
        return trainingEstimate(trainingMetricEntities)
    }

    fun addWordsToUserDictionary(gameId: Int): Completable {
        return webRequestsManagerAuthorised.addWordSetToDictionary(gameId)
    }
}
