package ru.inwords.inwords.core.deferred_uploader

import io.reactivex.Single

interface DeferredUploaderLocalDao<T> {
    fun retrieveAll(): Single<List<T>>
    fun addReplace(entry: T): Single<Long>
    fun deleteAll(): Single<Int>
}