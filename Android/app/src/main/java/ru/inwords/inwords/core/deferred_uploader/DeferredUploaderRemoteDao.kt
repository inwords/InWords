package ru.inwords.inwords.core.deferred_uploader

import io.reactivex.Single

interface DeferredUploaderRemoteDao<T : Any, R : Any, U : Any> {
    fun request(request: T): Single<R>
    fun uploadAll(requests: List<T>): Single<U>
}