package ru.inwords.inwords.dagger

import dagger.Binds
import dagger.Module
import ru.inwords.inwords.dagger.annotations.CacheRepository
import ru.inwords.inwords.dagger.annotations.LocalRepository
import ru.inwords.inwords.data.repository.game.GameGatewayController
import ru.inwords.inwords.data.repository.game.GameGatewayControllerImpl
import ru.inwords.inwords.data.repository.integration.IntegrationDatabaseRepository
import ru.inwords.inwords.data.repository.integration.IntegrationDatabaseRepositoryImpl
import ru.inwords.inwords.data.repository.translation.*
import ru.inwords.inwords.data.source.webService.WebRequestsManager
import ru.inwords.inwords.data.source.webService.WebRequestsManagerImpl
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
    fun authorisationWebInteractor(interactor: AuthorisationWebInteractor):
    // Singleton annotation isn't necessary (in this case since Application instance is unique)
    // but is here for convention.
            AuthorisationInteractor

    @Binds
    @Singleton
    fun webRequests(webRequests: WebRequestsManagerImpl): WebRequestsManager

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
    fun translationWordsCacheInteractor(interactor: TranslationWordsCacheInteractor): TranslationWordsRepositoryInteractor

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
    @CacheRepository
    fun translationWordsCacheRepository(repository: TranslationWordsCacheRepository): TranslationWordsLocalRepository

    @Binds
    @Singleton
    fun translationWordsWebApiRepository(repository: TranslationWordsWebApiRepository): TranslationWordsRemoteRepository

    @Binds
    @Singleton
    fun integrationDatabaseRepository(repository: IntegrationDatabaseRepositoryImpl): IntegrationDatabaseRepository
}
