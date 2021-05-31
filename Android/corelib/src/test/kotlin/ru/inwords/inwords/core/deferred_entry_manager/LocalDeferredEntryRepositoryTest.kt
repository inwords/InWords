package ru.inwords.inwords.core.deferred_entry_manager

import io.mockk.called
import io.mockk.spyk
import io.mockk.verify
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import ru.inwords.inwords.core.mock.LocalEntriesListDaoMock.UnitDeferredEntry
import ru.inwords.inwords.core.deferred_entry_manager.model.local.DeferredEntryFactory
import ru.inwords.inwords.core.deferred_entry_manager.model.local.Status
import ru.inwords.inwords.core.deferred_entry_manager.repository.LocalDeferredEntryRepository
import ru.inwords.inwords.core.deferred_entry_manager.repository.LocalEntriesListDao
import ru.inwords.inwords.core.mock.LocalEntriesListDaoMock

internal class LocalDeferredEntryRepositoryTest {

    private lateinit var localDao: LocalEntriesListDao<EntityIdentificator, UnitDeferredEntry>

    private lateinit var localDeferredEntryRepository: LocalDeferredEntryRepository<EntityIdentificator, UnitDeferredEntry>

    @BeforeEach
    fun before() {
        localDao = spyk(LocalEntriesListDaoMock())

        val deferredEntryFactory = object : DeferredEntryFactory<EntityIdentificator, UnitDeferredEntry> {
            override fun create(status: Status, value: EntityIdentificator): UnitDeferredEntry {
                return UnitDeferredEntry(status, value)
            }
        }
        localDeferredEntryRepository = LocalDeferredEntryRepository(localDao, deferredEntryFactory)
    }

    @Test
    fun addReplaceAll_whenDeferred() {
        val values = listOf(EntityIdentificator(0, 0), EntityIdentificator(0, 0))

        val entriesToAdd = values.map { UnitDeferredEntry(Status.LOCALLY_CREATED, it) }

        val entriesReference = listOf(UnitDeferredEntry(Status.LOCALLY_CREATED, values[0].copy(id = 1)),
            UnitDeferredEntry(Status.LOCALLY_CREATED, values[0].copy(id = 2)))

        localDeferredEntryRepository.addReplaceAll(values)
            .test()
            .assertResult(entriesReference)

        verify { localDao.addReplaceAll(entriesToAdd) }
    }

    @Test
    fun addReplaceAll_whenNotDeferred() {
        val values = listOf(EntityIdentificator(0, 0), EntityIdentificator(0, 0))

        val entriesToAdd = values.map { UnitDeferredEntry(Status.SYNCED, it) }

        val entriesReference = listOf(UnitDeferredEntry(Status.SYNCED, values[0].copy(id = 1)),
            UnitDeferredEntry(Status.SYNCED, values[0].copy(id = 2)))

        localDeferredEntryRepository.addReplaceAll(values, true)
            .test()
            .assertResult(entriesReference)

        verify { localDao.addReplaceAll(entriesToAdd) }
    }

    @Test
    fun retrieveAll() {
        val values = listOf(EntityIdentificator(0, 0), EntityIdentificator(0, 0))
        localDeferredEntryRepository.addReplaceAll(values).blockingGet()

        val entriesReference = listOf(UnitDeferredEntry(Status.LOCALLY_CREATED, values[0].copy(id = 1)),
            UnitDeferredEntry(Status.LOCALLY_CREATED, values[0].copy(id = 2)))

        localDeferredEntryRepository.retrieveAll()
            .test()
            .assertResult(entriesReference)

        verify { localDao.retrieveAll() }
    }

    @Test
    fun deleteAllLocalIds_whenDeferred() {
        val values = listOf(
            EntityIdentificator(0, 0),
            EntityIdentificator(0, 0),
            EntityIdentificator(0, 0),
            EntityIdentificator(0, 0)
        )

        localDeferredEntryRepository.addReplaceAll(values).blockingGet()

        val localIds = listOf(1L, 3L)

        val entriesReference = listOf(UnitDeferredEntry(Status.LOCALLY_DELETED, values[0].copy(id = 1)),
            UnitDeferredEntry(Status.LOCALLY_CREATED, values[0].copy(id = 2)),
            UnitDeferredEntry(Status.LOCALLY_DELETED, values[0].copy(id = 3)),
            UnitDeferredEntry(Status.LOCALLY_CREATED, values[0].copy(id = 4))
        )

        val entriesUpdated = listOf(UnitDeferredEntry(Status.LOCALLY_DELETED, values[0].copy(id = 1)),
            UnitDeferredEntry(Status.LOCALLY_DELETED, values[0].copy(id = 3))
        )

        localDeferredEntryRepository.deleteAllLocalIds(localIds)
            .test()
            .assertComplete()

        verify { localDao.retrieveAllByLocalId(localIds) }
        verify { localDao.addReplaceAll(entriesUpdated) }
        verify { localDao.deleteAllLocalIds(localIds) wasNot called }

        localDeferredEntryRepository.retrieveAll()
            .test()
            .assertResult(entriesReference)
    }

    @Test
    fun deleteAllLocalIds_whenNotDeferred() {
        val values = listOf(
            EntityIdentificator(0, 0),
            EntityIdentificator(0, 0),
            EntityIdentificator(0, 0),
            EntityIdentificator(0, 0)
        )
        localDeferredEntryRepository.addReplaceAll(values).blockingGet()

        val entriesReference = listOf(UnitDeferredEntry(Status.LOCALLY_CREATED, values[0].copy(id = 2)),
            UnitDeferredEntry(Status.LOCALLY_CREATED, values[0].copy(id = 4))
        )

        localDeferredEntryRepository.deleteAllLocalIds(listOf(1, 3), false)
            .test()
            .assertComplete()

        verify { localDao.deleteAllLocalIds(listOf(1, 3)) }

        localDeferredEntryRepository.retrieveAll()
            .test()
            .assertResult(entriesReference)
    }

    @Test
    fun deleteAllServerIdsWithoutParameters() {
        val values = listOf(
            EntityIdentificator(0, 1),
            EntityIdentificator(0, 2),
            EntityIdentificator(0, 3),
            EntityIdentificator(0, 4)
        )
        localDeferredEntryRepository.addReplaceAll(values, true).blockingGet()

        val entriesReference = emptyList<UnitDeferredEntry>()

        localDeferredEntryRepository.deleteAllRemoteIds()
            .test()
            .assertResult()

        verify { localDao.deleteAllServerIds() }

        localDeferredEntryRepository.retrieveAll()
            .test()
            .assertResult(entriesReference)
    }

    @Test
    fun deleteAllServerIdsWithParameters() {
        val values = listOf(
            EntityIdentificator(0, 1),
            EntityIdentificator(0, 2),
            EntityIdentificator(0, 3),
            EntityIdentificator(0, 4)
        )
        localDeferredEntryRepository.addReplaceAll(values, true).blockingGet()

        val entriesReference = listOf(UnitDeferredEntry(Status.SYNCED, values[1].copy(id = 2)),
            UnitDeferredEntry(Status.SYNCED, values[3].copy(id = 4))
        )

        localDeferredEntryRepository.deleteAllRemoteIds(listOf(1, 3))
            .test()
            .assertResult()

        verify { localDao.deleteAllServerIds(listOf(1, 3)) }

        localDeferredEntryRepository.retrieveAll()
            .test()
            .assertResult(entriesReference)
    }
}