package com.dreamproject.inwords.presentation.viewScenario.home

import com.dreamproject.inwords.data.dto.User
import com.dreamproject.inwords.domain.interactor.profile.ProfileInteractor
import com.dreamproject.inwords.domain.interactor.translation.TranslationSyncInteractor
import com.dreamproject.inwords.domain.interactor.translation.TranslationWordsInteractor
import com.dreamproject.inwords.domain.model.Resource
import com.dreamproject.inwords.presentation.viewScenario.BasicViewModel
import io.reactivex.Observable

class HomeViewModel internal constructor(
        private val translationWordsInteractor: TranslationWordsInteractor,
        private val translationSyncInteractor: TranslationSyncInteractor,
        private val profileInteractor: ProfileInteractor) : BasicViewModel() {

    val profileDataSubject: Observable<Resource<User>> get() = profileInteractor.getAuthorisedUser()

    val wordsCountSubject: Observable<Int> get() = translationWordsInteractor.allWords.map { it.size }

    @Deprecated("remove asap")
    fun onGetAllHandler(obs: Observable<Any>) {
        compositeDisposable.add(obs.subscribe({
            translationSyncInteractor.presyncOnStart().blockingGet()
            translationSyncInteractor.trySyncAllReposWithCache().blockingGet()

            compositeDisposable.add(translationWordsInteractor.allWords.subscribe { println(it) })
        }, Throwable::printStackTrace))
    }
}
