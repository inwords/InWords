package ru.inwords.inwords.core.deferred_entry_manager

import io.mockk.*
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import ru.inwords.inwords.core.deferred_entry_manager.LocalEntriesListDaoMock.UnitDeferredEntry
import ru.inwords.inwords.core.deferred_entry_manager.model.local.DeferredEntryFactory
import ru.inwords.inwords.core.deferred_entry_manager.model.local.Status
import ru.inwords.inwords.core.deferred_entry_manager.repository.LocalDeferredEntryRepository
import ru.inwords.inwords.core.deferred_entry_manager.repository.LocalEntriesListDao
import ru.inwords.inwords.core.deferred_entry_manager.repository.RemoteDeferredEntryWriteRepository
import ru.inwords.inwords.core.deferred_entry_manager.repository.RemoteEntriesListBasicDao
import ru.inwords.inwords.translation.data.bean.EntityIdentificator

internal class DeferredEntryManagerTest {
    private lateinit var localDao: LocalEntriesListDao<EntityIdentificator, UnitDeferredEntry>
    private lateinit var remoteDao: RemoteEntriesListBasicDao<EntityIdentificator>

    private lateinit var localDeferredEntryRepository: LocalDeferredEntryRepository<EntityIdentificator, UnitDeferredEntry>
    private lateinit var remoteDeferredEntryWriteRepository: RemoteDeferredEntryWriteRepository<EntityIdentificator>

    private lateinit var deferredEntryManager: DeferredEntryManager<EntityIdentificator, UnitDeferredEntry>

    @BeforeEach
    fun before() {
        localDao = spyk(LocalEntriesListDaoMock())
        remoteDao = spyk(RemoteEntriesListDaoMock())

        val deferredEntryFactory = object : DeferredEntryFactory<EntityIdentificator, UnitDeferredEntry> {
            override fun create(status: Status, value: EntityIdentificator): UnitDeferredEntry {
                return UnitDeferredEntry(status, value)
            }
        }
        localDeferredEntryRepository = spyk(LocalDeferredEntryRepository(localDao, deferredEntryFactory))
        remoteDeferredEntryWriteRepository = spyk(RemoteDeferredEntryWriteRepository(remoteDao))

        deferredEntryManager = DeferredEntryManager(localDeferredEntryRepository, remoteDeferredEntryWriteRepository)
    }

    @Test
    fun createAll_shouldHaveLocalId_whenNew() {
        val values = listOf(
            EntityIdentificator(),
            EntityIdentificator()
        )

        val referenceResult = listOf(
            EntityIdentificator(1, 0),
            EntityIdentificator(2, 0)
        )

        deferredEntryManager.createAll(values)
            .test()
            .assertResult(referenceResult)

        deferredEntryManager.retrieveAll()
            .test()
            .assertResult(referenceResult)

        verifyOrder {
            localDeferredEntryRepository.addReplaceAll(values)
            localDeferredEntryRepository.retrieveAll()
        }

        verify { remoteDeferredEntryWriteRepository wasNot Called }

        verifyAll(inverse = true) {
            localDeferredEntryRepository.deleteAllLocalIds(any(), any())
            localDeferredEntryRepository.deleteAllRemoteIds(any())
            localDeferredEntryRepository.retrieveAllByLocalId(any())
        }
    }

    @Test
    fun deleteAll_shouldDeferred_whenAlreadySynced() {
        deleteAll(alreadySynced = true, deferred = true)
    }

    @Test
    fun deleteAll_shouldNotDeferred_whenNotSynced() {
        deleteAll(alreadySynced = false, deferred = false)
    }

    @Test
    fun tryUploadUpdatesToRemote() {
        val valuesLocal = listOf(
            EntityIdentificator(),
            EntityIdentificator()
        )

        val referenceResultLocal = listOf(
            EntityIdentificator(1, 0),
            EntityIdentificator(2, 0)
        )

        deferredEntryManager.createAll(valuesLocal)
            .test()
            .assertResult(referenceResultLocal)

        val valuesRemote = listOf(
            EntityIdentificator(0, 1),
            EntityIdentificator(0, 2)
        )

        val referenceResultRemote = listOf(
            EntityIdentificator(3, 1),
            EntityIdentificator(4, 2)
        )

        deferredEntryManager.createAll(valuesRemote)
            .test()
            .assertResult(referenceResultRemote)

        deferredEntryManager.retrieveAll()
            .test()
            .assertResult(referenceResultLocal.plus(referenceResultRemote))

        //TODO дописать здесь и затестить ситуацию с перезаписью значения, когда одинаковый id
    }

    private fun deleteAll(alreadySynced: Boolean, deferred: Boolean) {
        val values = listOf(
            EntityIdentificator(),
            EntityIdentificator(),
            EntityIdentificator(),
            EntityIdentificator()
        )

        val referenceResult = listOf(
            EntityIdentificator(1, 0),
            EntityIdentificator(2, 0),
            EntityIdentificator(3, 0),
            EntityIdentificator(4, 0)
        )

        val valuesForDelete = referenceResult.subList(1, 3)
        val valuesAfterDelete = referenceResult.minus(valuesForDelete)

        deferredEntryManager.createAll(values, alreadySynced)
            .test()
            .assertResult(referenceResult)

        deferredEntryManager.deleteAll(valuesForDelete)
            .test()
            .assertResult()

        deferredEntryManager.retrieveAll()
            .test()
            .assertResult(valuesAfterDelete)

        verify { remoteDeferredEntryWriteRepository wasNot Called }

        verify {
            localDeferredEntryRepository.deleteAllLocalIds(listOf(2, 3), deferred)
            localDeferredEntryRepository.retrieveAllByLocalId(listOf(2, 3))
        }

        verifyAll(inverse = true) {
            localDeferredEntryRepository.deleteAllRemoteIds(any())
            localDeferredEntryRepository.retrieveAll()
        }
    }
}