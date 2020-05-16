package ru.inwords.inwords.home

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import io.reactivex.Observable
import io.reactivex.functions.BiFunction
import ru.inwords.inwords.core.SingleLiveEvent
import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.home.recycler.CardWrapper
import ru.inwords.inwords.home.recycler.applyDiffUtil
import ru.inwords.inwords.presentation.view_scenario.BasicViewModel
import ru.inwords.inwords.profile.domain.interactor.ProfileInteractor
import ru.inwords.inwords.profile.domain.model.Profile
import ru.inwords.inwords.translation.domain.interactor.TranslationWordsInteractor

class HomeViewModel internal constructor(
    private val translationWordsInteractor: TranslationWordsInteractor,
    private val profileInteractor: ProfileInteractor
) : BasicViewModel() {

    private val errorLiveData = SingleLiveEvent<String>()
    private val profileLiveData = MutableLiveData<Profile>()

    val profile: LiveData<Profile> = profileLiveData
    val error: LiveData<String> = errorLiveData

    val cardWrappers
        get() = Observable.combineLatest(
            getProfileData(),
            getWordsCount(),
            BiFunction() { profile: CardWrapper, dictionary: CardWrapper.DictionaryModel ->
                if (profile is CardWrapper.ProfileModel || profile is CardWrapper.ProfileLoadingMarker) {
                    if (dictionary.count == 0) {
                        listOf(dictionary)
                    } else {
                        listOf(dictionary)
                    }
                } else {
                    listOf(profile, dictionary) //create account here
                }
            }
        )
            .applyDiffUtil()

    private fun getProfileData() = profileInteractor.getAuthorisedUser()
        .map {
            when (it) {
                is Resource.Success -> CardWrapper.ProfileModel(it.data).also { model -> profileLiveData.postValue(model.profile) }
                is Resource.Loading -> CardWrapper.ProfileLoadingMarker
                is Resource.Error -> {
                    profileLiveData.postValue(Profile(-1, "InWords", 0, null, null, "", null, ""))
                    CardWrapper.CreateAccountMarker
                }
            }
        }
        .startWith(CardWrapper.ProfileLoadingMarker)

    private fun getWordsCount() = translationWordsInteractor.getAllWords()
        .map { it.size }
        .startWith(0)
        .map { CardWrapper.DictionaryModel(true, it) }
        .onErrorReturnItem(CardWrapper.DictionaryModel(false))

    fun handleNavigation(cardWrapper: CardWrapper) {
        when (cardWrapper) {
            is CardWrapper.CreateAccountMarker -> navigateTo(HomeFragmentDirections.actionMainFragmentToRegister(false))
            is CardWrapper.ProfileLoadingMarker -> Unit
            is CardWrapper.ProfileModel -> navigateTo(HomeFragmentDirections.actionMainFragmentToProfileFragment())
            is CardWrapper.DictionaryModel -> navigateTo(HomeFragmentDirections.actionMainFragmentToDictionary())
        }
    }

    fun navigateToProfile() {
        navigateTo(HomeFragmentDirections.actionMainFragmentToProfileFragment())
    }
}
