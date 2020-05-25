package ru.inwords.inwords.game.data.deferred.level_score

import io.reactivex.Single
import ru.inwords.inwords.core.deferred_uploader.DeferredUploader
import ru.inwords.inwords.core.deferred_uploader.DeferredUploaderLocalDao
import ru.inwords.inwords.core.deferred_uploader.DeferredUploaderRemoteDao
import ru.inwords.inwords.game.data.entity.TrainingMetricEntity
import ru.inwords.inwords.game.data.repository.GameRemoteRepository
import ru.inwords.inwords.game.data.source.TrainingMetricEntityDao
import ru.inwords.inwords.game.domain.model.TrainingScore
import ru.inwords.inwords.main_activity.data.WorkManagerWrapper

class LevelScoreDeferredUploaderFactory(
    private val gameRemoteRepository: GameRemoteRepository,
    private val trainingMetricEntityDao: TrainingMetricEntityDao,
    private val workManagerWrapper: WorkManagerWrapper
) {

    private val deferredUploaderLocalDao = object : DeferredUploaderLocalDao<TrainingMetricEntity> {
        override fun retrieveAll(): Single<List<TrainingMetricEntity>> {
            return trainingMetricEntityDao.getAllScores()
        }

        override fun addReplace(entry: TrainingMetricEntity): Single<Long> {
            return trainingMetricEntityDao.insert(entry).doOnSuccess {
                workManagerWrapper.enqueue<LevelScoreUploadWorker>("LevelScoreUploadWorker")
            }
        }

        override fun deleteAll(): Single<Int> {
            return trainingMetricEntityDao.deleteAll()
        }
    }

    private val deferredUploaderRemoteDao = object : DeferredUploaderRemoteDao<TrainingMetricEntity, TrainingScore, List<TrainingScore>> {
        override fun request(request: TrainingMetricEntity): Single<TrainingScore> {
            return if (request.levelId >= 0) { //TODO remove negative ids
                gameRemoteRepository.trainingEstimate(request)
            } else {
                gameRemoteRepository.save(request)
            }
        }

        override fun uploadAll(requests: List<TrainingMetricEntity>): Single<List<TrainingScore>> {
            val customGameRequests = requests.filter { it.levelId < 0 }
            val normalGameRequests = requests.filter { it.levelId >= 0 }

            val singles = mutableListOf<Single<List<TrainingScore>>>()
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