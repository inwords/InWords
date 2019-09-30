package ru.inwords.inwords.dagger

import dagger.Binds
import dagger.Module
import ru.inwords.inwords.dagger.annotations.LocalRepository
import ru.inwords.inwords.data.repository.game.GameGatewayController
import ru.inwords.inwords.data.repository.game.GameGatewayControllerImpl
import ru.inwords.inwords.data.repository.integration.IntegrationDatabaseRepository
import ru.inwords.inwords.data.repository.integration.IntegrationDatabaseRepositoryImpl
import ru.inwords.inwords.data.repository.translation.TranslationWordsDatabaseRepository
import ru.inwords.inwords.data.repository.translation.TranslationWordsLocalRepository
import ru.inwords.inwords.data.repository.translation.TranslationWordsRemoteRepository
import ru.inwords.inwords.data.repository.translation.TranslationWordsWebApiRepository
import ru.inwords.inwords.data.source.remote.WebRequestsManagerAuthorised
import ru.inwords.inwords.data.source.remote.WebRequestsManagerAuthorisedImpl
import ru.inwords.inwords.data.source.remote.WebRequestsManagerUnauthorised
import ru.inwords.inwords.data.source.remote.WebRequestsManagerUnauthorisedImpl
import ru.inwords.inwords.domain.interactor.authorisation.AuthorisationInteractor
import ru.inwords.inwords.domain.interactor.authorisation.AuthorisationWebInteractor
import ru.inwords.inwords.domain.interactor.game.GameInteractor
import ru.inwords.inwords.domain.interactor.game.GameInteractorImpl
import ru.inwords.inwords.domain.interactor.integration.IntegrationInteractor
import ru.inwords.inwords.domain.interactor.integration.IntegrationInteractorImpl
import ru.inwords.inwords.domain.interactor.profile.ProfileInteractor
import ru.inwords.inwords.domain.interactor.profile.ProfileInteractorImpl
import ru.inwords.inwords.domain.interactor.translation.*
import javax.inject.Singleton

@Module
interface DataAbstractModule {
    @Binds
    fun authorisationWebInteractor(interactor: AuthorisationWebInteractor): AuthorisationInteractor
    // Singleton annotation isn't necessary (in this case since Application instance is unique)
    // but is here for convention.

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
    fun profileInteractor(interactor: ProfileInteractorImpl): ProfileInteractor

    @Binds
    @Singleton
    fun translationSyncInteractor(interactor: TranslationSyncInteractorImpl): TranslationSyncInteractor

    @Binds
    @Singleton
    fun translationWordsInteractor(interactor: TranslationWordsInteractorImpl): TranslationWordsInteractor

    @Binds
    @Singleton
    fun translationWordsCacheInteractor(interactor: TranslationWordsLocalInteractor): TranslationWordsRepositoryInteractor

    //repos
    @Binds
    @Singleton
    fun gameGatewayController(gameGatewayController: GameGatewayControllerImpl): GameGatewayController

    @Binds
    @Singleton
    @LocalRepository
    fun translationWordsDatabaseRepository(repository: TranslationWordsDatabaseRepository): TranslationWordsLocalRepository

    @Binds
    @Singleton
    fun translationWordsWebApiRepository(repository: TranslationWordsWebApiRepository): TranslationWordsRemoteRepository

    @Binds
    @Singleton
    fun integrationDatabaseRepository(repository: IntegrationDatabaseRepositoryImpl): IntegrationDatabaseRepository
}
