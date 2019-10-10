package ru.inwords.inwords.presentation.view_scenario.home

import io.reactivex.Observable
import io.reactivex.functions.BiFunction
import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.domain.interactor.integration.IntegrationInteractor
import ru.inwords.inwords.presentation.view_scenario.BasicViewModel
import ru.inwords.inwords.presentation.view_scenario.home.recycler.CardWrapper
import ru.inwords.inwords.presentation.view_scenario.home.recycler.applyDiffUtil
import ru.inwords.inwords.profile.domain.interactor.ProfileInteractor
import ru.inwords.inwords.translation.domain.interactor.TranslationWordsInteractor

class HomeViewModel internal constructor(
    private val translationWordsInteractor: TranslationWordsInteractor,
    private val profileInteractor: ProfileInteractor,
    private val integrationInteractor: IntegrationInteractor) : BasicViewModel() {

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
            BiFunction { profile: CardWrapper, dictionary: CardWrapper -> listOf(profile, dictionary) }
        )
            .applyDiffUtil()

    fun getPolicyAgreementState() = integrationInteractor.getPolicyAgreementState()
}
