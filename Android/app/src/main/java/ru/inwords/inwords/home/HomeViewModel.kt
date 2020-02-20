package ru.inwords.inwords.home

import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import io.reactivex.Observable
import io.reactivex.functions.Function3
import io.reactivex.subjects.BehaviorSubject
import ru.inwords.inwords.R
import ru.inwords.inwords.core.managers.ResourceManager
import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import ru.inwords.inwords.home.recycler.CardWrapper
import ru.inwords.inwords.home.recycler.SimpleState
import ru.inwords.inwords.home.recycler.applyDiffUtil
import ru.inwords.inwords.policy.domain.interactor.PolicyInteractor
import ru.inwords.inwords.presentation.SingleLiveEvent
import ru.inwords.inwords.presentation.view_scenario.BasicViewModel
import ru.inwords.inwords.profile.data.bean.User
import ru.inwords.inwords.profile.domain.interactor.ProfileInteractor
import ru.inwords.inwords.training.domain.TrainingInteractor
import ru.inwords.inwords.translation.domain.interactor.TranslationWordsInteractor

class HomeViewModel internal constructor(
    private val translationWordsInteractor: TranslationWordsInteractor,
    private val profileInteractor: ProfileInteractor,
    private val policyInteractor: PolicyInteractor,
    private val trainingInteractor: TrainingInteractor,
    private val resourceManager: ResourceManager
) : BasicViewModel() {

    private val errorLiveData = SingleLiveEvent<String>()
    private val profileLiveData = MutableLiveData<User>()

    val profile: LiveData<User> = profileLiveData
    val error: LiveData<String> = errorLiveData

    private val training = BehaviorSubject.createDefault(CardWrapper.WordsTrainingModel(SimpleState.READY))

    private val profileData: Observable<CardWrapper>
        get() = profileInteractor.getAuthorisedUser()
            .map {
                when (it) {
                    is Resource.Success -> CardWrapper.ProfileModel(it.data).also { model -> profileLiveData.postValue(model.user) }
                    is Resource.Loading -> CardWrapper.ProfileLoadingMarker
                    is Resource.Error -> CardWrapper.CreateAccountMarker
                }
            }
            .startWith(CardWrapper.ProfileLoadingMarker)

    private val wordsCount: Observable<CardWrapper.DictionaryModel>
        get() = translationWordsInteractor.getAllWords()
            .map { it.size }
            .startWith(0)
            .map { CardWrapper.DictionaryModel(true, it) }
            .onErrorReturnItem(CardWrapper.DictionaryModel(false))

    val cardWrappers
        get() = Observable.combineLatest(
            profileData,
            wordsCount,
            training,
            Function3 { profile: CardWrapper, dictionary: CardWrapper.DictionaryModel, training: CardWrapper.WordsTrainingModel ->
                if (profile is CardWrapper.ProfileModel || profile is CardWrapper.ProfileLoadingMarker) {
                    listOf(dictionary, training)
                } else {
                    listOf(profile, dictionary) //create account here
                }
            }
        )
            .applyDiffUtil()

    fun getPolicyAgreementState() = policyInteractor.getPolicyAgreementState()

    private fun onWordsTrainingClicked() {
        Observable.fromCallable { trainingInteractor.getActualWordsForTraining() }
            .subscribeOn(SchedulersFacade.io())
            .doOnSubscribe { training.onNext(CardWrapper.WordsTrainingModel(SimpleState.LOADING)) }
            .subscribe({
                navigateTo(HomeFragmentDirections.toCustomGameCreatorFragment(it.toTypedArray()))
                training.onNext(CardWrapper.WordsTrainingModel(SimpleState.READY))
            }, {
                training.onNext(CardWrapper.WordsTrainingModel(SimpleState.ERROR))
                errorLiveData.postValue(resourceManager.getString(R.string.unable_to_load_exercise))
                Log.e(javaClass.simpleName, it.message.orEmpty())
            })
            .autoDispose()
    }

    fun handleNavigation(cardWrapper: CardWrapper) {
        when (cardWrapper) {
            is CardWrapper.CreateAccountMarker -> navigateTo(HomeFragmentDirections.actionMainFragmentToLoginFragment())
            is CardWrapper.ProfileLoadingMarker -> Unit
            is CardWrapper.ProfileModel -> navigateTo(HomeFragmentDirections.actionMainFragmentToProfileFragment())
            is CardWrapper.DictionaryModel -> navigateTo(HomeFragmentDirections.actionMainFragmentToDictionary())
            is CardWrapper.WordsTrainingModel -> onWordsTrainingClicked()
        }
    }

    fun navigateToPolicy() {
        navigateTo(HomeFragmentDirections.actionMainFragmentToPolicyFragment())
    }

    fun navigateToProfile() {
        navigateTo(HomeFragmentDirections.actionMainFragmentToProfileFragment())
    }
}
