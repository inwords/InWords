package ru.inwords.inwords.data.repository.integration

import io.reactivex.Completable
import ru.inwords.inwords.data.source.database.AppRoomDatabase
import javax.inject.Inject

class IntegrationDatabaseRepositoryImpl @Inject internal constructor(val database: AppRoomDatabase) : IntegrationDatabaseRepository {
    override fun clearAllTables(): Completable {
        return Completable.fromAction { database.clearAllTables() }
    }
}
