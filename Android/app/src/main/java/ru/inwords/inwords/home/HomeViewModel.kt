package ru.inwords.inwords.home

import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import io.reactivex.Observable
import io.reactivex.Single
import io.reactivex.functions.BiFunction
import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.domain.interactor.integration.IntegrationInteractor
import ru.inwords.inwords.home.recycler.CardWrapper
import ru.inwords.inwords.home.recycler.applyDiffUtil
import ru.inwords.inwords.presentation.SingleLiveEvent
import ru.inwords.inwords.presentation.view_scenario.BasicViewModel
import ru.inwords.inwords.profile.data.bean.User
import ru.inwords.inwords.profile.domain.interactor.ProfileInteractor
import ru.inwords.inwords.training.domain.TrainingInteractor
import ru.inwords.inwords.translation.data.bean.WordTranslation
import ru.inwords.inwords.translation.domain.interactor.TranslationWordsInteractor

class HomeViewModel internal constructor(
    private val translationWordsInteractor: TranslationWordsInteractor,
    private val profileInteractor: ProfileInteractor,
    private val integrationInteractor: IntegrationInteractor,
    private val trainingInteractor: TrainingInteractor) : BasicViewModel() {

    private val navigateToCustomGameCreatorLiveData = SingleLiveEvent<List<WordTranslation>>()
    private val profileLiveData = MutableLiveData<User>()

    val navigateToCustomGameCreator: LiveData<List<WordTranslation>> = navigateToCustomGameCreatorLiveData
    val profile: LiveData<User> = profileLiveData

    private val profileData: Observable<CardWrapper>
        get() = profileInteractor.getAuthorisedUser()
            .map {
                when (it) {
                    is Resource.Success -> CardWrapper.ProfileModel(it.data)
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
            BiFunction { profile: CardWrapper, dictionary: CardWrapper ->
                if (profile is CardWrapper.ProfileModel || profile is CardWrapper.ProfileLoadingMarker) {
                    if (profile is CardWrapper.ProfileModel){
                        profileLiveData.postValue(profile.user)
                    }

                    listOf(dictionary, CardWrapper.WordsTrainingMarker)
                } else {
                    listOf(profile, dictionary, CardWrapper.WordsTrainingMarker)
                }
            }
        )
            .applyDiffUtil()

    fun getPolicyAgreementState() = integrationInteractor.getPolicyAgreementState()

    fun onWordsTrainingClicked() {
        Single.fromCallable { trainingInteractor.getActualWordsForTraining() }
            .subscribe({
                navigateToCustomGameCreatorLiveData.postValue(it)
            }, {
                Log.e(javaClass.simpleName, it.message.orEmpty())
            })
            .autoDispose()
    }
}
