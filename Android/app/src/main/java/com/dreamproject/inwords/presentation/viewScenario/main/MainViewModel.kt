package com.dreamproject.inwords.presentation.viewScenario.main

import com.dreamproject.inwords.data.dto.User
import com.dreamproject.inwords.domain.interactor.profile.ProfileInteractor
import com.dreamproject.inwords.domain.interactor.translation.TranslationSyncInteractor
import com.dreamproject.inwords.domain.interactor.translation.TranslationWordsInteractor
import com.dreamproject.inwords.presentation.viewScenario.BasicViewModel
import io.reactivex.Observable
import io.reactivex.Single

//compositeDisposable, model and application are available from BasicPresenter
class MainViewModel internal constructor(
        private val translationWordsInteractor: TranslationWordsInteractor,
        private val translationSyncInteractor: TranslationSyncInteractor,
        private val profileInteractor: ProfileInteractor) : BasicViewModel() {

    val profileDataSubject: Single<User> get() = profileInteractor.getAuthorisedUser()

    fun onGetAllHandler(obs: Observable<Any>) {
        compositeDisposable.add(obs.subscribe {
            translationSyncInteractor.presyncOnStart().blockingGet()
            translationSyncInteractor.trySyncAllReposWithCache().blockingGet()

            compositeDisposable.add(translationWordsInteractor.allWords.subscribe { println(it) })
        })
    }
}
