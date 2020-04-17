package ru.inwords.inwords.translation.data.deferred

import android.util.Log
import io.reactivex.Single
import ru.inwords.inwords.core.deferred_entry_manager.repository.LocalEntriesListDao

class LocalWordTranslationsListDao(
    private val entriesListDao: WordTranslationEntriesListDao
) : LocalEntriesListDao<WordTranslationValue, WordTranslationDeferredEntry> {
    override fun addReplaceAll(entries: List<WordTranslationDeferredEntry>): Single<List<Long>> {
        return entriesListDao.addReplaceAll(entries)
    }

    override fun retrieveAll() = entriesListDao.retrieveAll().doOnSuccess { Log.d("retrieveAll", it.toString()) }
    override fun retrieveAllByLocalId(localIds: List<Long>) = entriesListDao.retrieveAllByLocalId(localIds).doOnSuccess { Log.d("retrieveAllByLocalId", it.toString()) }
    override fun deleteAllLocalIds(localIds: List<Long>) = entriesListDao.deleteAllLocalIds(localIds)
    override fun deleteAllServerIds() = entriesListDao.deleteAllServerIds()
    override fun deleteAllServerIds(serverIds: List<Int>) = entriesListDao.deleteAllServerIds(serverIds)
}