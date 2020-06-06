package ru.inwords.inwords.core.deferred_entry_manager.adapter

import io.reactivex.Completable
import io.reactivex.Observable
import ru.inwords.inwords.core.deferred_entry_manager.model.CopyableWithId
import ru.inwords.inwords.core.resource.Resource

interface ResourceDeferredActions<V> where V : CopyableWithId<V> {
    fun addReplaceAll(values: List<V>): Completable
    fun removeAll(values: List<V>): Completable
    fun retrieveAll(forceUpdate: Boolean = false): Observable<Resource<List<V>>>
    fun tryUploadUpdatesToRemote(): Completable
    fun clearCache()
}