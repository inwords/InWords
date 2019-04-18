package com.dreamproject.inwords.dagger

import com.dreamproject.inwords.dagger.annotations.CacheRepository
import com.dreamproject.inwords.dagger.annotations.LocalRepository
import com.dreamproject.inwords.data.repository.game.GameGatewayController
import com.dreamproject.inwords.data.repository.game.GameGatewayControllerImpl
import com.dreamproject.inwords.data.repository.translation.*
import com.dreamproject.inwords.data.source.webService.WebRequestsManager
import com.dreamproject.inwords.data.source.webService.WebRequestsManagerImpl
import com.dreamproject.inwords.domain.interactor.authorisation.AuthorisationInteractor
import com.dreamproject.inwords.domain.interactor.authorisation.AuthorisationWebInteractor
import com.dreamproject.inwords.domain.interactor.game.GameInteractor
import com.dreamproject.inwords.domain.interactor.game.GameInteractorImpl
import com.dreamproject.inwords.domain.interactor.profile.ProfileInteractor
import com.dreamproject.inwords.domain.interactor.profile.ProfileInteractorImpl
import com.dreamproject.inwords.domain.interactor.translation.*
import dagger.Binds
import dagger.Module
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
}
