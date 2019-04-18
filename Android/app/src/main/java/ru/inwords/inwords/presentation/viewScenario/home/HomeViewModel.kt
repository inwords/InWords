package ru.inwords.inwords.presentation.viewScenario.home

import io.reactivex.Observable
import ru.inwords.inwords.data.dto.User
import ru.inwords.inwords.domain.interactor.profile.ProfileInteractor
import ru.inwords.inwords.domain.interactor.translation.TranslationSyncInteractor
import ru.inwords.inwords.domain.interactor.translation.TranslationWordsInteractor
import ru.inwords.inwords.domain.model.Resource
import ru.inwords.inwords.presentation.viewScenario.BasicViewModel

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
