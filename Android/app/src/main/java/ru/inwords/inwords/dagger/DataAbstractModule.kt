package ru.inwords.inwords.dagger

import dagger.Binds
import dagger.Module
import ru.inwords.inwords.authorisation.domain.interactor.AuthorisationInteractor
import ru.inwords.inwords.authorisation.domain.interactor.AuthorisationWebInteractor
import ru.inwords.inwords.data.repository.integration.IntegrationDatabaseRepository
import ru.inwords.inwords.data.repository.integration.IntegrationDatabaseRepositoryImpl
import ru.inwords.inwords.data.source.remote.WebRequestsManagerAuthorised
import ru.inwords.inwords.data.source.remote.WebRequestsManagerAuthorisedImpl
import ru.inwords.inwords.data.source.remote.WebRequestsManagerUnauthorised
import ru.inwords.inwords.data.source.remote.WebRequestsManagerUnauthorisedImpl
import ru.inwords.inwords.game.data.repository.CustomGameGatewayController
import ru.inwords.inwords.game.data.repository.GameGatewayController
import ru.inwords.inwords.game.data.repository.GameGatewayControllerImpl
import ru.inwords.inwords.game.domain.interactor.GameInteractor
import ru.inwords.inwords.game.domain.interactor.GameInteractorImpl
import ru.inwords.inwords.main_activity.domain.interactor.IntegrationInteractor
import ru.inwords.inwords.main_activity.domain.interactor.IntegrationInteractorImpl
import ru.inwords.inwords.translation.data.repository.TranslationWordsRemoteRepository
import ru.inwords.inwords.translation.data.repository.TranslationWordsWebApiRepository
import ru.inwords.inwords.translation.domain.interactor.TranslationWordsInteractor
import ru.inwords.inwords.translation.domain.interactor.TranslationWordsInteractorImpl
import javax.inject.Singleton

@Module
interface DataAbstractModule {
    @Binds
    @Singleton
    fun authorisationWebInteractor(interactor: AuthorisationWebInteractor): AuthorisationInteractor

    @Binds
    @Singleton
    fun provideWebRequestsManagerAuthorised(webRequestsAuthorised: WebRequestsManagerAuthorisedImpl): WebRequestsManagerAuthorised

    @Binds
    @Singleton
    fun provideWebRequestsManagerUnauthorised(webRequests: WebRequestsManagerUnauthorisedImpl): WebRequestsManagerUnauthorised

    //interactors
    @Binds
    @Singleton
    fun integrationInteractor(interactor: IntegrationInteractorImpl): IntegrationInteractor

    @Binds
    @Singleton
    fun gameInteractor(interactor: GameInteractorImpl): GameInteractor

    @Binds
    @Singleton
    fun translationWordsInteractor(interactor: TranslationWordsInteractorImpl): TranslationWordsInteractor

    //repos
    @Binds
    fun gameGatewayController(gameGatewayController: GameGatewayControllerImpl): GameGatewayController

    @Binds
    fun customGameGatewayController(customGameGatewayController: GameGatewayControllerImpl): CustomGameGatewayController

    @Binds
    @Singleton
    fun translationWordsWebApiRepository(repository: TranslationWordsWebApiRepository): TranslationWordsRemoteRepository

    @Binds
    @Singleton
    fun integrationDatabaseRepository(repository: IntegrationDatabaseRepositoryImpl): IntegrationDatabaseRepository
}
