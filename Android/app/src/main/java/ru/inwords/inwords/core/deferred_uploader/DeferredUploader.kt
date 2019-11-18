package ru.inwords.inwords.core.deferred_uploader

import android.util.Log
import io.reactivex.Single
import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.core.resource.Source
import ru.inwords.inwords.core.resource.wrapResource
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import java.util.*

/**
 * @param T тип запроса
 * @param R тип ответа на запрос
 * @param U тип ответа на массовую отгрузку накопленных запросов
 */
class DeferredUploader<T : Any, R : Any, U : Any>(
    private val deferredUploaderLocalDao: DeferredUploaderLocalDao<T>,
    private val deferredUploaderRemoteDao: DeferredUploaderRemoteDao<T, R, U>
) : DeferredUploaderActions<T, R> {
    override fun getScore(request: T, onSuccessListener: (Resource.Success<R>) -> Unit): Single<Resource<R>> {
        return deferredUploaderRemoteDao.request(request).wrapResource(Source.NETWORK)
            .flatMap { res ->
                when (res) {
                    is Resource.Error -> defer(request, res)
                    is Resource.Success -> {
                        onSuccessListener.invoke(res)

                        Single.just(res)
                    }
                    is Resource.Loading -> Single.just(res)
                }
            }
            .subscribeOn(SchedulersFacade.io())
    }

    private fun defer(request: T, resourceToReturn: Resource<R>): Single<Resource<R>> {
        return deferredUploaderLocalDao.addReplace(request)
            .doOnError { Log.wtf(javaClass.simpleName, it.message.orEmpty()) }
            .map { resourceToReturn }
            .onErrorReturn { resourceToReturn }
    }

    override fun tryUploadDataToRemote(): Single<List<T>> {
        return deferredUploaderLocalDao.retrieveAll()
            .filter { it.isNotEmpty() }
            .flatMapSingle { entries ->
                deferredUploaderRemoteDao.uploadAll(entries)
                    .flatMap { deferredUploaderLocalDao.deleteAll() }
                    .map { entries }
            }
            .onErrorResumeNext { t ->
                if (t is NoSuchElementException) { //skip error if it is because of filter
                    Single.just(emptyList())
                } else {
                    Single.error(t)
                }
            }
    }
}