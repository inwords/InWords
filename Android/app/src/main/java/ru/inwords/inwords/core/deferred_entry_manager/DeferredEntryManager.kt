package ru.inwords.inwords.core.deferred_entry_manager

import android.annotation.SuppressLint
import io.reactivex.Completable
import io.reactivex.Single
import ru.inwords.inwords.core.deferred_entry_manager.Status.*
import ru.inwords.inwords.core.deferred_entry_manager.repository.LocalDeferredEntryRepository
import ru.inwords.inwords.core.deferred_entry_manager.repository.RemoteDeferredEntryRepository
import java.util.*

class DeferredEntryManager<V, T>(
    private val localDeferredEntryRepository: LocalDeferredEntryRepository<V, T>,
    private val remoteDeferredEntryRepository: RemoteDeferredEntryRepository<V>
) where V : CopyableWithId<V>, T : DeferredEntry<V> {
    private val allowedExternalStatuses = setOf(SYNCED, LOCALLY_CREATED)

    fun retrieveAll(): Single<List<V>> {
        return localDeferredEntryRepository.retrieveAll()
            .mapToExternal()
    }

    fun createAll(values: List<V>): Single<List<V>> {
        return localDeferredEntryRepository.addReplaceAll(values)
            .mapToExternal()
    }

    fun deleteAll(values: List<V>): Completable {
        val localIds = values.valuesAsLocalIds()
        return localDeferredEntryRepository.retrieveAllByLocalId(localIds)
            .map { entries -> entries.groupByStatus() }
            .flatMapCompletable { deleteListHandler(it) }
    }

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
                        localDeferredEntryRepository.deleteAllLocalIds(localIds, true)
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
                        remoteDeferredEntryRepository.deleteAll(serverIds)
                            .andThen(localDeferredEntryRepository.deleteAllServerIds(serverIds))
                            .also { completables.add(it) }
                    }

                    LOCALLY_CREATED -> {
                        val values = entries.entriesAsValues()
                        remoteDeferredEntryRepository.createAll(values)
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
            .filter { it.status in allowedExternalStatuses }
            .entriesAsValues()
    }

    private fun List<V>.valuesAsLocalIds() = map { it.localId }
    private fun List<T>.entriesAsLocalIds() = map { it.localId }
    private fun List<T>.entriesAsServerIds() = map { it.remoteId }
    private fun List<T>.entriesAsValues() = map { it.value }
    private fun List<T>.groupByStatus() = groupBy(DeferredEntry<V>::status)

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

        return newList
    }
}
