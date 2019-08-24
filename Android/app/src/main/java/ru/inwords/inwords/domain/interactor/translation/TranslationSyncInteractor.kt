package ru.inwords.inwords.domain.interactor.translation

import io.reactivex.Completable

interface TranslationSyncInteractor {
    fun presyncOnStart(): Completable

    fun trySyncAllReposWithCache(): Completable

    fun notifyDataChanged()
}
