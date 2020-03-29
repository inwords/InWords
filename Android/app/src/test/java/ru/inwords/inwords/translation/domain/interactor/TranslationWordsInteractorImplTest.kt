package ru.inwords.inwords.translation.domain.interactor

import android.util.Log
import io.mockk.*
import io.reactivex.Single
import io.reactivex.schedulers.TestScheduler
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import ru.inwords.inwords.core.deferred_entry_manager.LocalEntriesListDaoMock
import ru.inwords.inwords.core.deferred_entry_manager.model.local.Status
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import ru.inwords.inwords.translation.converter.WordTranslationValueConverter
import ru.inwords.inwords.translation.data.deferred.WordTranslationDeferredAdapterFactory
import ru.inwords.inwords.translation.data.deferred.WordTranslationDeferredAdapterHolder
import ru.inwords.inwords.translation.data.deferred.WordTranslationDeferredEntry
import ru.inwords.inwords.translation.data.deferred.WordTranslationValue
import ru.inwords.inwords.translation.data.repository.TranslationWordsRemoteRepository
import ru.inwords.inwords.translation.data.sync.TranslationSyncController
import ru.inwords.inwords.translation.domain.model.PullWordsAnswer
import ru.inwords.inwords.translation.domain.model.WordTranslation

internal class TranslationWordsInteractorImplTest {
    private val remoteRepository = mockk<TranslationWordsRemoteRepository>()
    private val localEntriesListDao = spyk<LocalEntriesListDaoMock<WordTranslationValue, WordTranslationDeferredEntry>>(LocalEntriesListDaoMock())

    private val deferredAdapterHolder = spyk(
        WordTranslationDeferredAdapterHolder(
            WordTranslationDeferredAdapterFactory(localEntriesListDao, remoteRepository)
        )
    )
    private val translationSyncController = spyk(TranslationSyncController(deferredAdapterHolder))

    private val interactor = spyk(TranslationWordsInteractorImpl(remoteRepository, deferredAdapterHolder, translationSyncController))

    private val wordTranslationValueConverter = WordTranslationValueConverter()

    private val testScheduler = TestScheduler()

    @BeforeEach
    fun beforeEach() {
        mockkObject(SchedulersFacade)
        every { SchedulersFacade.io() } returns testScheduler
        every { SchedulersFacade.computation() } returns testScheduler

        mockkStatic(Log::class)
        every { Log.d(any(), any()) } returns 0
        every { Log.e(any(), any()) } returns 0
    }

    @Test
    fun `given empty-oneAdded getAllWords should return empty-word`() {
        val wordTranslation = WordTranslation("", "", 0, 3)
        val wordTranslationInserted = wordTranslation.copy(id = 1)

        every { remoteRepository.pullWords(emptyList()) } returns Single.fromCallable { PullWordsAnswer(emptyList(), listOf(wordTranslation)) }

        val testObserver = interactor.getAllWords()
            .test()

        testScheduler.triggerActions()

        testObserver.assertValueCount(2)
            .assertValueAt(0, emptyList())
            .assertValueAt(1, listOf(wordTranslationInserted))

        verify(exactly = 2) { localEntriesListDao.retrieveAll() }
        verify(exactly = 1) {
            localEntriesListDao.addReplaceAll(
                listOf(WordTranslationDeferredEntry(Status.SYNCED, wordTranslationValueConverter.convert(wordTranslation)))
            )
        }
        verify(exactly = 1) {
            localEntriesListDao.addReplaceAll(
                listOf(WordTranslationDeferredEntry(Status.SYNCED, wordTranslationValueConverter.convert(wordTranslationInserted), 1))
            )
        }
        verify(exactly = 1) { remoteRepository.pullWords(emptyList()) }

        confirmVerified(localEntriesListDao, remoteRepository)
    }
}