package ru.inwords.inwords.profile.presentation.view

import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import io.reactivex.Observable
import ru.inwords.inwords.authorisation.data.session.LastAuthInfoProvider
import ru.inwords.inwords.authorisation.data.session.LastAuthInfoProvider.AuthMethod.NONE
import ru.inwords.inwords.authorisation.domain.interactor.AuthorisationInteractor
import ru.inwords.inwords.core.SingleLiveEvent
import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import ru.inwords.inwords.presentation.view_scenario.BasicViewModel
import ru.inwords.inwords.profile.data.bean.User
import ru.inwords.inwords.profile.domain.interactor.ProfileInteractor

class ProfileViewModel internal constructor(
    private val profileInteractor: ProfileInteractor,
    private val authorisationInteractor: AuthorisationInteractor
) : BasicViewModel() {

    val profileDataSubject: Observable<Resource<User>> get() = profileInteractor.getAuthorisedUser()

    private val changeNicknameMutableLiveData = SingleLiveEvent<Resource<Unit>>()
    val changeNicknameStatus: LiveData<Resource<Unit>> = changeNicknameMutableLiveData

    private val logoutStatusMutableLiveData = SingleLiveEvent<Resource<Unit>>()
    val logoutStatus: LiveData<Resource<Unit>> = logoutStatusMutableLiveData

    private val lastAuthMethodMutableLiveData = MutableLiveData<LastAuthInfoProvider.AuthMethod>()
    val lastAuthMethod: LiveData<LastAuthInfoProvider.AuthMethod> get() = lastAuthMethodMutableLiveData

    fun getLastAuthMethod() {
        authorisationInteractor.getLastAuthMethod()
            .subscribeOn(SchedulersFacade.io())
            .observeOn(SchedulersFacade.ui())
            .subscribe({
                lastAuthMethodMutableLiveData.value = it
            }, {
                lastAuthMethodMutableLiveData.value = NONE
            })
            .autoDispose()
    }

    fun updateUser(newUser: User) {
        profileInteractor.updateUser(newUser)
            .observeOn(SchedulersFacade.ui())
            .doOnSubscribe { changeNicknameMutableLiveData.postValue(Resource.Loading()) }
            .subscribe({
                changeNicknameMutableLiveData.postValue(Resource.Success(Unit))
            }, {
                Log.w(TAG, it.message.orEmpty())
                changeNicknameMutableLiveData.postValue(Resource.Error(it.message, it))
            })
            .autoDispose()
    }

    fun logout() {
        authorisationInteractor.logout()
            .subscribeOn(SchedulersFacade.io())
            .doOnSubscribe { logoutStatusMutableLiveData.postValue(Resource.Loading()) }
            .subscribe({
                navigateTo(ProfileFragmentDirections.actionGlobalPopToMainFragment())
                logoutStatusMutableLiveData.postValue(Resource.Success(Unit))
            }, {
                Log.w(TAG, it.message.orEmpty())
                logoutStatusMutableLiveData.postValue(Resource.Error(it.message, it))
            })
            .autoDispose()
    }

    fun onNavigateToLoginClicked() {
        navigateTo(ProfileFragmentDirections.actionProfileFragmentToLoginFragment(false))
    }

    fun onNavigateToSettingsClicked() {
        navigateTo(ProfileFragmentDirections.actionProfileFragmentToSettingsFragment())
    }

    companion object {
        const val TAG = "ProfileViewModel"
    }
}
