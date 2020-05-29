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
import ru.inwords.inwords.game.data.grpc.WordSetGrpcService
import ru.inwords.inwords.game.domain.model.TrainingScore
import ru.inwords.inwords.network.AuthorisedRequestsManager

class GameRemoteRepository internal constructor(
    private val authorisedRequestsManager: AuthorisedRequestsManager,
    private val wordSetGrpcService: WordSetGrpcService
) {
    private val wordSetInfoReplyConverter = WordSetInfoReplyConverter()
    private val levelWordReplyConverter = LevelWordConverter()
    private val levelReplyConverter = LevelReplyConverter()

    private val trainingScoreConverter = TrainingScoreConverter()
    private val trainingMetricEntityToCardGameMetricConverter = TrainingMetricEntityToCardGameMetricConverter()

    fun getGameInfos(): Single<List<GameInfoEntity>> {
        return authorisedRequestsManager.wrapRequest(wordSetGrpcService.getWordSets())
            .map { wordSetReply -> wordSetInfoReplyConverter.convertList(wordSetReply.wordSetsList) }
    }

    fun getGame(wordSetId: Int): Single<GameEntity> {
        return authorisedRequestsManager.wrapRequest(wordSetGrpcService.getLevels(wordSetId))
            .map { getLevelsReply -> GameEntity(wordSetId, levelReplyConverter.convertList(getLevelsReply.levelsList)) }
    }

    fun getLevel(levelId: Int): Single<GameLevelEntity> {
        return authorisedRequestsManager.wrapRequest(wordSetGrpcService.getLevelWords(levelId))
            .map { getLevelWordsReply -> GameLevelEntity(levelId, levelWordReplyConverter.convertList(getLevelWordsReply.wordsList)) }
    }

    fun trainingEstimate(trainingMetricEntity: TrainingMetricEntity): Single<TrainingScore> {
        return trainingEstimate(listOf(trainingMetricEntity)).map { it.first() }
    }

    fun trainingEstimate(trainingMetricEntities: List<TrainingMetricEntity>): Single<List<TrainingScore>> {
        return authorisedRequestsManager.wrapRequest(
            wordSetGrpcService.estimate(trainingMetricEntityToCardGameMetricConverter.convertList(trainingMetricEntities))
        )
            .map { reply -> reply.scoresList.map { trainingScoreConverter.convert(it) } }
    }

    fun save(trainingMetricEntity: TrainingMetricEntity): Single<TrainingScore> {
        return trainingEstimate(trainingMetricEntity)
    }

    fun save(trainingMetricEntities: List<TrainingMetricEntity>): Single<List<TrainingScore>> {
        return trainingEstimate(trainingMetricEntities)
    }

    fun addWordsToUserDictionary(gameId: Int): Completable {
        return authorisedRequestsManager.wrapRequest(wordSetGrpcService.addWordSetToDictionary(gameId))
    }
}
