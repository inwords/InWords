package ru.inwords.inwords.translation.data.deferred

import android.util.Log
import io.reactivex.Completable
import io.reactivex.Single
import ru.inwords.inwords.core.deferred_entry_manager.DeferredEntryManager
import ru.inwords.inwords.core.deferred_entry_manager.adapter.ResourceCachingProviderPullDeferredAdapter
import ru.inwords.inwords.core.deferred_entry_manager.model.HasLocalAndServerId
import ru.inwords.inwords.core.deferred_entry_manager.model.local.DeferredEntryFactory
import ru.inwords.inwords.core.deferred_entry_manager.model.local.Status
import ru.inwords.inwords.core.deferred_entry_manager.model.remote.BasicPullResponse
import ru.inwords.inwords.core.deferred_entry_manager.model.remote.PullResponse
import ru.inwords.inwords.core.deferred_entry_manager.repository.LocalDeferredEntryRepository
import ru.inwords.inwords.core.deferred_entry_manager.repository.LocalEntriesListDao
import ru.inwords.inwords.core.deferred_entry_manager.repository.RemoteDeferredEntryWriteRepository
import ru.inwords.inwords.core.deferred_entry_manager.repository.RemoteEntriesListPullDao
import ru.inwords.inwords.translation.converter.WordTranslationValueConverter
import ru.inwords.inwords.translation.data.repository.TranslationWordsRemoteRepository

class WordTranslationDeferredAdapterFactory internal constructor(
    localEntriesListDao: LocalEntriesListDao<WordTranslationValue, WordTranslationDeferredEntry>,
    private val translationWordsRemoteRepository: TranslationWordsRemoteRepository
) {
    private val wordTranslationValueConverter = WordTranslationValueConverter()

    private val deferredEntryFactory = object : DeferredEntryFactory<WordTranslationValue, WordTranslationDeferredEntry> {
        override fun create(status: Status, value: WordTranslationValue): WordTranslationDeferredEntry {
            return WordTranslationDeferredEntry(status, value, value.localId)
        }
    }

    private val remoteEntriesListPullDao = object : RemoteEntriesListPullDao<WordTranslationValue> {
        override fun createAll(values: List<WordTranslationValue>): Single<List<HasLocalAndServerId>> { //TODO incorrect
            values.forEach { if (it.localId == 0L) Log.wtf("WordTranslationDeferredAdapterFactory", "localId == 0 $it") } //TODO verifier
            return translationWordsRemoteRepository.insertAllWords(wordTranslationValueConverter.reverseList(values)).map { it }
        }

        override fun deleteAll(serverIds: List<Int>): Completable {
            return translationWordsRemoteRepository.removeAllByServerId(serverIds)
        }

        override fun retrieveAll(existingServedIdsProvider: List<Int>): Single<PullResponse<WordTranslationValue>> {
            return translationWordsRemoteRepository.pullWords(existingServedIdsProvider).map {
                BasicPullResponse(wordTranslationValueConverter.convertList(it.addedWords), it.removedServerIds)
            }
        }
    }
    private val localDeferredEntryRepository = LocalDeferredEntryRepository(localEntriesListDao, deferredEntryFactory)

    private val remoteDeferredEntryRepository = RemoteDeferredEntryWriteRepository(remoteEntriesListPullDao)

    private val deferredEntryManager = DeferredEntryManager(localDeferredEntryRepository, remoteDeferredEntryRepository)

    fun create() = ResourceCachingProviderPullDeferredAdapter(deferredEntryManager, remoteEntriesListPullDao)
}