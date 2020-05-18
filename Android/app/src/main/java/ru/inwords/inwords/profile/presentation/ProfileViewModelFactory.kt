package ru.inwords.inwords.profile.presentation

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import ru.inwords.inwords.authorisation.domain.interactor.AuthorisationInteractor
import ru.inwords.inwords.profile.domain.interactor.ProfileInteractor
import ru.inwords.inwords.profile.presentation.view.ProfileViewModel

class ProfileViewModelFactory internal constructor(
    private val profileInteractor: ProfileInteractor,
    private val authorisationInteractor: AuthorisationInteractor
) : ViewModelProvider.Factory {

    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(ProfileViewModel::class.java)) {
            @Suppress("UNCHECKED_CAST")
            return ProfileViewModel(profileInteractor, authorisationInteractor) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class")
    }

}
