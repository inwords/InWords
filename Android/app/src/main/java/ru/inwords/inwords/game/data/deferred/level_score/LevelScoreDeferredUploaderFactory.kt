package ru.inwords.inwords.game.data.deferred.level_score

import io.reactivex.Single
import ru.inwords.inwords.core.deferred_uploader.DeferredUploader
import ru.inwords.inwords.core.deferred_uploader.DeferredUploaderLocalDao
import ru.inwords.inwords.core.deferred_uploader.DeferredUploaderRemoteDao
import ru.inwords.inwords.game.data.bean.LevelScore
import ru.inwords.inwords.game.data.bean.LevelScoreRequest
import ru.inwords.inwords.game.data.repository.GameRemoteRepository
import ru.inwords.inwords.game.data.source.LevelScoreRequestDao

class LevelScoreDeferredUploaderFactory(
    private val gameRemoteRepository: GameRemoteRepository,
    private val levelScoreRequestDao: LevelScoreRequestDao) {

    private val deferredUploaderLocalDao = object : DeferredUploaderLocalDao<LevelScoreRequest> {
        override fun retrieveAll(): Single<List<LevelScoreRequest>> {
            return levelScoreRequestDao.getAllScores()
        }

        override fun addReplace(entry: LevelScoreRequest): Single<Long> {
            return levelScoreRequestDao.insert(entry)
        }

        override fun deleteAll(): Single<Int> {
            return levelScoreRequestDao.deleteAll()
        }
    }

    private val deferredUploaderRemoteDao = object : DeferredUploaderRemoteDao<LevelScoreRequest, LevelScore, Boolean> {
        override fun request(request: LevelScoreRequest): Single<LevelScore> {
            return gameRemoteRepository.getScore(request)
        }

        override fun uploadAll(requests: List<LevelScoreRequest>): Single<Boolean> {
            return gameRemoteRepository.uploadScore(requests)
        }
    }

    fun create() = DeferredUploader(deferredUploaderLocalDao, deferredUploaderRemoteDao)
}