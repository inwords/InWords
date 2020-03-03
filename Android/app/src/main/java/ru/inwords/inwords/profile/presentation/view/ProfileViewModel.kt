package ru.inwords.inwords.profile.presentation.view

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import io.reactivex.Observable
import ru.inwords.inwords.core.Event
import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import ru.inwords.inwords.presentation.view_scenario.BasicViewModel
import ru.inwords.inwords.profile.data.bean.User
import ru.inwords.inwords.profile.domain.interactor.ProfileInteractor
import ru.inwords.inwords.translation.domain.interactor.TranslationWordsInteractor

class ProfileViewModel internal constructor(
    private val translationWordsInteractor: TranslationWordsInteractor,
    private val profileInteractor: ProfileInteractor) : BasicViewModel() {

    val profileDataSubject: Observable<Resource<User>> get() = profileInteractor.getAuthorisedUser()

    val wordsCountSubject: Observable<Int>
        get() = translationWordsInteractor.getAllWords()
            .map { it.size }

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

    fun onNavigateToLoginClicked() {
        navigateTo(ProfileFragmentDirections.actionProfileFragmentToLoginFragment(false))
    }

    fun onNavigateToSettingsClicked() {
        navigateTo(ProfileFragmentDirections.actionProfileFragmentToSettingsFragment())
    }
}
