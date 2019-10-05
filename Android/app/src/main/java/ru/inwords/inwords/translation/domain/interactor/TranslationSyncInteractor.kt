package ru.inwords.inwords.translation.domain.interactor

import io.reactivex.Completable

interface TranslationSyncInteractor {
    fun presyncOnStart(): Completable

    fun trySyncAllReposWithCache(): Completable

    fun notifyDataChanged()
}
