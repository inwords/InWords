package ru.inwords.inwords.core.deferred_entry_manager.adapter

import io.reactivex.Completable
import io.reactivex.Observable
import ru.inwords.inwords.core.deferred_entry_manager.DeferredEntryManager
import ru.inwords.inwords.core.deferred_entry_manager.model.CopyableWithId
import ru.inwords.inwords.core.deferred_entry_manager.model.local.DeferredEntry
import ru.inwords.inwords.core.deferred_entry_manager.repository.RemoteEntriesListBasicDao
import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.core.resource.ResourceCachingProvider

class ResourceCachingProviderDeferredAdapter<V, T>(
    private val deferredEntryManager: DeferredEntryManager<V, T>,
    private val remoteEntriesListBasicDao: RemoteEntriesListBasicDao<V>
) : ResourceDeferredActions<V> where V : CopyableWithId<V>, T : DeferredEntry<V, T> {

    private val resourceCachingProviderLocator = ResourceCachingProvider.Locator { createCachingProvider() }

    override fun addReplaceAll(values: List<V>): Completable {
        return deferredEntryManager.createAll(values)
            .doOnSuccess { resourceCachingProviderLocator.getDefault().askForDatabaseContent() }
            .ignoreElement()
    }

    override fun removeAll(values: List<V>): Completable {
        return deferredEntryManager.deleteAll(values)
            .doOnComplete { resourceCachingProviderLocator.getDefault().askForDatabaseContent() }
    }

    override fun retrieveAll(forceUpdate: Boolean): Observable<Resource<List<V>>> {
        return resourceCachingProviderLocator.getDefault().observe(forceUpdate)
    }

    override fun tryUploadUpdatesToRemote(): Completable {
        return deferredEntryManager.tryUploadUpdatesToRemote()
            .doOnComplete { resourceCachingProviderLocator.getDefault().askForDatabaseContent() }
    }

    override fun clearCache() {
        resourceCachingProviderLocator.clear()
    }

    private fun createCachingProvider() = ResourceCachingProvider(
        prefetchFromDatabase = true,
        databaseInserter = { values ->
            deferredEntryManager.deleteAllRemoteIds()
                .andThen(deferredEntryManager.createAll(values, alreadySynced = true)) //TODO run in transaction
        },
        databaseGetter = { deferredEntryManager.retrieveAll() },
        remoteDataProvider = { remoteEntriesListBasicDao.retrieveAll() }
    )
}