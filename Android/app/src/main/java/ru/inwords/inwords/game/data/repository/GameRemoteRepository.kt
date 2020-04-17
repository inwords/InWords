package ru.inwords.inwords.game.data.repository

import io.reactivex.Completable
import io.reactivex.Single
import ru.inwords.inwords.data.source.remote.WebRequestsManagerAuthorised
import ru.inwords.inwords.game.converter.WordSetInfoReplyConverter
import ru.inwords.inwords.game.data.bean.*
import ru.inwords.inwords.game.data.converter.LevelReplyConverter
import ru.inwords.inwords.game.data.converter.LevelWordConverter
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class GameRemoteRepository @Inject constructor(private val webRequestsManagerAuthorised: WebRequestsManagerAuthorised) {
    private val wordSetInfoReplyConverter = WordSetInfoReplyConverter()
    private val levelWordReplyConverter = LevelWordConverter()
    private val levelReplyConverter = LevelReplyConverter()

    fun getGameInfos(): Single<List<GameInfoEntity>> {
        return webRequestsManagerAuthorised.getGameInfos()
            .map { wordSetReply -> wordSetInfoReplyConverter.convertList(wordSetReply.wordSetsList) }
    }

    fun getGame(wordSetId: Int): Single<GameResponse> {
        return webRequestsManagerAuthorised.getLevels(wordSetId)
            .map { getLevelsReply -> GameResponse(wordSetId, levelReplyConverter.convertList(getLevelsReply.levelsList)) }
    }

    fun getLevel(levelId: Int): Single<GameLevel> {
        return webRequestsManagerAuthorised.getLevelWords(levelId)
            .map { getLevelWordsReply -> GameLevel(levelId, levelWordReplyConverter.convertList(getLevelWordsReply.wordsList)) }
    }

    fun getScore(levelScoreRequest: LevelScoreRequest): Single<LevelScore> {
        return webRequestsManagerAuthorised.getScore(TrainingEstimateRequest(listOf(levelScoreRequest)))
            .map { it.first() }
    }

    fun uploadScore(levelScoreRequests: List<LevelScoreRequest>): Single<Boolean> {
        return webRequestsManagerAuthorised.getScore(TrainingEstimateRequest(levelScoreRequests))
            .map { true }
    }

    fun addWordsToUserDictionary(gameId: Int): Completable {
        return webRequestsManagerAuthorised.addWordSetToDictionary(gameId)
    }
}
