package ru.inwords.inwords.core.deferred_entry_manager.adapter

import io.reactivex.Completable
import io.reactivex.Observable
import ru.inwords.inwords.core.deferred_entry_manager.DeferredEntryManager
import ru.inwords.inwords.core.deferred_entry_manager.model.CopyableWithId
import ru.inwords.inwords.core.deferred_entry_manager.model.local.DeferredEntry
import ru.inwords.inwords.core.deferred_entry_manager.model.remote.PullResponse
import ru.inwords.inwords.core.deferred_entry_manager.repository.RemoteEntriesListPullDao
import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.core.resource.ResourceCachingProviderWithFinalValue

class ResourceCachingProviderPullDeferredAdapter<V, T>(
    private val deferredEntryManager: DeferredEntryManager<V, T>,
    private val remoteEntriesListBasicDao: RemoteEntriesListPullDao<V>
) : ResourceDeferredActions<V> where V : CopyableWithId<V>, T : DeferredEntry<V, T> {

    private val resourceCachingProviderLocator = ResourceCachingProviderWithFinalValue.Locator { createCachingProvider() }

    override fun addReplaceAll(values: List<V>): Completable {
        return deferredEntryManager.createAll(values)
            .doOnSuccess { resourceCachingProviderLocator.getDefault().askForFinalValue() }
            .ignoreElement()
    }

    override fun removeAll(values: List<V>): Completable {
        return deferredEntryManager.deleteAll(values)
            .doOnComplete { resourceCachingProviderLocator.getDefault().askForFinalValue() }
    }

    override fun retrieveAll(forceUpdate: Boolean): Observable<Resource<List<V>>> {
        return resourceCachingProviderLocator.getDefault().observe(forceUpdate)
    }

    override fun tryUploadUpdatesToRemote(): Completable {
        return deferredEntryManager.tryUploadUpdatesToRemote()
            .doOnComplete { resourceCachingProviderLocator.getDefault().askForFinalValue() }
    }

    override fun clearCache() {
        resourceCachingProviderLocator.clear()
    }

    private fun createCachingProvider() = ResourceCachingProviderWithFinalValue<PullResponse<V>, List<V>>(
        databaseInserter = { pullResponse ->
            val completables = mutableListOf<Completable>()

            val added = pullResponse.added ?: emptyList()
            val removed = pullResponse.removed ?: emptyList()

            if (removed.isNotEmpty()) {
                deferredEntryManager.deleteAllRemoteIds(removed)
            } else if (added.isNotEmpty()) {
                deferredEntryManager.createAll(added, alreadySynced = true)
                    .ignoreElement()
                    .also { completables.add(it) }
            }

            Completable.concat(completables)
        },
        finalValueProvider = { deferredEntryManager.retrieveAll() },
        remoteDataProvider = {
            deferredEntryManager.retrieveAll()
                .flatMap { values -> remoteEntriesListBasicDao.retrieveAll(values.map { it.remoteId }) }
        }
    )
}