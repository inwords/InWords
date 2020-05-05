package ru.inwords.inwords.game.data.deferred.level_score

import io.reactivex.Single
import ru.inwords.inwords.core.deferred_uploader.DeferredUploader
import ru.inwords.inwords.core.deferred_uploader.DeferredUploaderLocalDao
import ru.inwords.inwords.core.deferred_uploader.DeferredUploaderRemoteDao
import ru.inwords.inwords.data.WorkManagerWrapper
import ru.inwords.inwords.game.data.entity.LevelMetricEntity
import ru.inwords.inwords.game.data.repository.GameRemoteRepository
import ru.inwords.inwords.game.data.source.LevelScoreRequestDao
import ru.inwords.inwords.game.domain.model.LevelScore

class LevelScoreDeferredUploaderFactory(
    private val gameRemoteRepository: GameRemoteRepository,
    private val levelScoreRequestDao: LevelScoreRequestDao,
    private val workManagerWrapper: WorkManagerWrapper
) {

    private val deferredUploaderLocalDao = object : DeferredUploaderLocalDao<LevelMetricEntity> {
        override fun retrieveAll(): Single<List<LevelMetricEntity>> {
            return levelScoreRequestDao.getAllScores()
        }

        override fun addReplace(entry: LevelMetricEntity): Single<Long> {
            return levelScoreRequestDao.insert(entry).doOnSuccess {
                workManagerWrapper.enqueue<LevelScoreUploadWorker>("LevelScoreUploadWorker")
            }
        }

        override fun deleteAll(): Single<Int> {
            return levelScoreRequestDao.deleteAll()
        }
    }

    private val deferredUploaderRemoteDao = object : DeferredUploaderRemoteDao<LevelMetricEntity, LevelScore, List<LevelScore>> {
        override fun request(request: LevelMetricEntity): Single<LevelScore> {
            return if (request.levelId >= 0) { //TODO remove negative ids
                gameRemoteRepository.trainingEstimate(request)
            } else {
                gameRemoteRepository.save(request)
            }
        }

        override fun uploadAll(requests: List<LevelMetricEntity>): Single<List<LevelScore>> {
            val customGameRequests = requests.filter { it.levelId < 0 }
            val normalGameRequests = requests.filter { it.levelId >= 0 }

            val singles = mutableListOf<Single<List<LevelScore>>>()
            if (normalGameRequests.isNotEmpty()) {
                singles.add(gameRemoteRepository.trainingEstimate(normalGameRequests))
            }
            if (customGameRequests.isNotEmpty()) {
                singles.add(gameRemoteRepository.save(customGameRequests))
            }

            return Single.concat(singles).toList().map { it.reduce { acc, list -> acc + list } }
        }
    }

    fun create() = DeferredUploader(deferredUploaderLocalDao, deferredUploaderRemoteDao)
}