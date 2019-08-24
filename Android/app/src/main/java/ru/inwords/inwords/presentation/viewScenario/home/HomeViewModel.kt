package ru.inwords.inwords.presentation.viewScenario.home

import io.reactivex.Observable
import io.reactivex.functions.BiFunction
import ru.inwords.inwords.domain.interactor.integration.IntegrationInteractor
import ru.inwords.inwords.domain.interactor.profile.ProfileInteractor
import ru.inwords.inwords.domain.interactor.translation.TranslationWordsInteractor
import ru.inwords.inwords.domain.model.Resource
import ru.inwords.inwords.presentation.viewScenario.BasicViewModel
import ru.inwords.inwords.presentation.viewScenario.home.recycler.CardWrapper

class HomeViewModel internal constructor(
        translationWordsInteractor: TranslationWordsInteractor,
        profileInteractor: ProfileInteractor,
        private val integrationInteractor: IntegrationInteractor) : BasicViewModel() {

    private val profileData: Observable<CardWrapper> = profileInteractor.getAuthorisedUser()
            .startWith(Resource.Loading())
            .map {
                when (it) {
                    is Resource.Success -> CardWrapper.ProfileModel(it.data)
                    is Resource.Loading -> CardWrapper.ProfileLoadingMarker
                    is Resource.Error -> CardWrapper.CreateAccountMarker
                }
            }

    private val wordsCount: Observable<CardWrapper.DictionaryModel> = translationWordsInteractor.getAllWords()
            .map { it.size }
            .map { CardWrapper.DictionaryModel(true, it) }
            .onErrorReturnItem(CardWrapper.DictionaryModel(false))

    val cardWrappers = Observable.combineLatest(
            profileData,
            wordsCount,
            BiFunction { profile: CardWrapper, dictionary: CardWrapper -> listOf(profile, dictionary) }
    )

    fun getPolicyAgreementState() = integrationInteractor.getPolicyAgreementState()
}
