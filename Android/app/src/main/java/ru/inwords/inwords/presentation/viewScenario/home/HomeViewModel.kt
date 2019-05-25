package ru.inwords.inwords.presentation.viewScenario.home

import io.reactivex.Observable
import ru.inwords.inwords.data.dto.User
import ru.inwords.inwords.domain.interactor.profile.ProfileInteractor
import ru.inwords.inwords.domain.interactor.translation.TranslationWordsInteractor
import ru.inwords.inwords.domain.model.Resource
import ru.inwords.inwords.presentation.viewScenario.BasicViewModel

class HomeViewModel internal constructor(
        private val translationWordsInteractor: TranslationWordsInteractor,
        private val profileInteractor: ProfileInteractor) : BasicViewModel() {

    val profileDataSubject: Observable<Resource<User>> get() = profileInteractor.getAuthorisedUser()

    val wordsCountSubject: Observable<Int> get() = translationWordsInteractor.getAllWords().map { it.size }
}
