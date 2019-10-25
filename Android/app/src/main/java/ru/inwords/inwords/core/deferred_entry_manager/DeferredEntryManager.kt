package ru.inwords.inwords.core.deferred_entry_manager

import android.annotation.SuppressLint
import io.reactivex.Completable
import io.reactivex.Single
import ru.inwords.inwords.core.deferred_entry_manager.model.CopyableWithId
import ru.inwords.inwords.core.deferred_entry_manager.model.HasLocalAndServerId
import ru.inwords.inwords.core.deferred_entry_manager.model.local.DeferredEntry
import ru.inwords.inwords.core.deferred_entry_manager.model.local.Status
import ru.inwords.inwords.core.deferred_entry_manager.model.local.Status.*
import ru.inwords.inwords.core.deferred_entry_manager.repository.LocalDeferredEntryRepository
import ru.inwords.inwords.core.deferred_entry_manager.repository.RemoteDeferredEntryWriteRepository

class DeferredEntryManager<V, T>(
    private val localDeferredEntryRepository: LocalDeferredEntryRepository<V, T>,
    private val remoteDeferredEntryWriteRepository: RemoteDeferredEntryWriteRepository<V>
) where V : CopyableWithId<V>, T : DeferredEntry<V, T> {
    private val allowedExternalStatuses = setOf(SYNCED, LOCALLY_CREATED)

    fun retrieveAll(): Single<List<V>> {
        return localDeferredEntryRepository.retrieveAll()
            .mapToExternal()
    }

    fun createAll(values: List<V>, alreadySynced: Boolean = false): Single<List<V>> {
        return localDeferredEntryRepository.addReplaceAll(values, alreadySynced)
            .mapToExternal()
    }

    fun deleteAll(values: List<V>): Completable {
        val localIds = values.map { it.localId }
//        remoteDeferredEntryWriteRepository.deleteAll(values.map { it.remoteId }).blockingGet()
        return localDeferredEntryRepository.retrieveAllByLocalId(localIds)
            .map { entries -> entries.groupByStatus() }
            .flatMapCompletable(this::deleteListHandler)
    }

    fun deleteAllRemoteIds() = localDeferredEntryRepository.deleteAllRemoteIds()

    fun deleteAllRemoteIds(serverIds: List<Int>) = localDeferredEntryRepository.deleteAllRemoteIds(serverIds)

    fun tryUploadUpdatesToRemote(): Completable {
        return localDeferredEntryRepository.retrieveAll()
            .map { entries -> entries.groupByStatus() }
            .flatMapCompletable(this::uploadListHandler)
    }

    private fun deleteListHandler(group: Map<Status, List<T>>): Completable {
        val completables = mutableListOf<Completable>()

        group.forEach { (status, entries) ->
            if (entries.isNotEmpty()) {
                when (status) {
                    SYNCED -> {
                        val localIds = entries.entriesAsLocalIds()
                        localDeferredEntryRepository.deleteAllLocalIds(localIds)
                            .also { completables.add(it) }
                    }

                    LOCALLY_CREATED -> {
                        val localIds = entries.entriesAsLocalIds()
                        localDeferredEntryRepository.deleteAllLocalIds(localIds, false)
                            .also { completables.add(it) }
                    }

                    LOCALLY_DELETED -> {
                        Unit //no need to process
                    }
                }
            }
        }

        return Completable.mergeDelayError(completables)
    }

    private fun uploadListHandler(group: Map<Status, List<T>>): Completable {
        val completables = mutableListOf<Completable>()

        group.forEach { (status, entries) ->
            if (entries.isNotEmpty()) {
                when (status) {
                    LOCALLY_DELETED -> {
                        val serverIds = entries.entriesAsServerIds()
                        remoteDeferredEntryWriteRepository.deleteAll(serverIds)
                            .andThen(localDeferredEntryRepository.deleteAllRemoteIds(serverIds))
                            .also { completables.add(it) }
                    }

                    LOCALLY_CREATED -> {
                        val values = entries.entriesAsValues()
                        remoteDeferredEntryWriteRepository.createAll(values)
                            .flatMap { associatedIds ->
                                localDeferredEntryRepository.addReplaceAll(mergeIds(values, associatedIds), alreadySynced = true)
                            }
                            .ignoreElement()
                            .also { completables.add(it) }
                    }

                    SYNCED -> {
                        Unit //no need to process
                    }
                }
            }
        }

        return Completable.mergeDelayError(completables)
    }

    private fun Single<List<T>>.mapToExternal() = map { entries ->
        entries
            .filter {
                //                Log.d("mapToExternal", it.toString())
                it.status in allowedExternalStatuses
            }
            .entriesAsValues()
    }

    private fun List<T>.entriesAsLocalIds() = map { it.localId }
    private fun List<T>.entriesAsServerIds() = map { it.remoteId }
    private fun List<T>.entriesAsValues() = map { it.value }
    private fun List<T>.groupByStatus() = groupBy(DeferredEntry<V, T>::status)

    private fun <I : HasLocalAndServerId> mergeIds(values: List<V>, associatedIds: List<I>): List<V> {
        if (values.isEmpty()) {
            return emptyList()
        }

        if (associatedIds.isEmpty()) {
            return values
        }

        val newList = mutableListOf<V>()

        @SuppressLint("UseSparseArrays")
        val associatedIdsSet = HashMap<Long, I>(associatedIds.size).apply {
            putAll(associatedIds.associateBy { it.localId })
        }

        values.forEach { value ->
            associatedIdsSet[value.localId]?.let { newList.add(value.copyWithRemoteId(it.remoteId)) }
        }

//        Log.d("mergeIdsValues", values.toString())
//        Log.d("mergeIdsAssociatedIds", associatedIds.toString())
//        Log.d("mergeIdsNewList", newList.toString())

        return newList
    }
}
