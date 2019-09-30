package ru.inwords.inwords.presentation.view_scenario.profile

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import io.reactivex.Observable
import ru.inwords.inwords.core.Resource
import ru.inwords.inwords.core.util.Event
import ru.inwords.inwords.core.util.SchedulersFacade
import ru.inwords.inwords.data.dto.User
import ru.inwords.inwords.domain.interactor.profile.ProfileInteractor
import ru.inwords.inwords.domain.interactor.translation.TranslationWordsInteractor
import ru.inwords.inwords.presentation.view_scenario.BasicViewModel

class ProfileViewModel internal constructor(
        private val translationWordsInteractor: TranslationWordsInteractor,
        private val profileInteractor: ProfileInteractor) : BasicViewModel() {

    val profileDataSubject: Observable<Resource<User>> get() = profileInteractor.getAuthorisedUser()

    val wordsCountSubject: Observable<Int> get() = translationWordsInteractor.getAllWords().map { it.size }

    private val _changeNickStatusLiveData = MutableLiveData<Event<Resource<Unit>>>()

    val changeNickname: LiveData<Event<Resource<Unit>>> = _changeNickStatusLiveData

    fun updateUser(newUser: User) {
        profileInteractor.updateUser(newUser)
                .observeOn(SchedulersFacade.ui())
                .doOnSubscribe { _changeNickStatusLiveData.postValue(Event(Resource.Loading())) }
                .subscribe({
                    _changeNickStatusLiveData.postValue(Event(Resource.Success(Unit)))
                }, {
                    _changeNickStatusLiveData.postValue(Event(Resource.Error(it.message, it)))
                })
                .autoDispose()
    }
}
