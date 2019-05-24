package ru.inwords.inwords.data.repository.integration

import io.reactivex.Completable

interface IntegrationDatabaseRepository {
    fun clearAllTables(): Completable
}