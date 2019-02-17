package com.dreamproject.inwords.dagger;

import com.dreamproject.inwords.dagger.annotations.CacheRepository;
import com.dreamproject.inwords.dagger.annotations.LocalRepository;
import com.dreamproject.inwords.data.interactor.authorisation.AuthorisationInteractor;
import com.dreamproject.inwords.data.interactor.authorisation.AuthorisationWebInteractor;
import com.dreamproject.inwords.data.interactor.translation.TranslationSyncInteractor;
import com.dreamproject.inwords.data.interactor.translation.TranslationSyncInteractorImpl;
import com.dreamproject.inwords.data.interactor.translation.TranslationWordsCacheInteractor;
import com.dreamproject.inwords.data.interactor.translation.TranslationWordsInteractor;
import com.dreamproject.inwords.data.interactor.translation.TranslationWordsInteractorImpl;
import com.dreamproject.inwords.data.interactor.translation.TranslationWordsRepositoryInteractor;
import com.dreamproject.inwords.data.repository.translation.TranslationWordsCacheRepository;
import com.dreamproject.inwords.data.repository.translation.TranslationWordsDatabaseRepository;
import com.dreamproject.inwords.data.repository.translation.TranslationWordsLocalRepository;
import com.dreamproject.inwords.data.repository.translation.TranslationWordsRemoteRepository;
import com.dreamproject.inwords.data.repository.translation.TranslationWordsWebApiRepository;
import com.dreamproject.inwords.data.source.WebService.WebRequestsManager;
import com.dreamproject.inwords.data.source.WebService.WebRequestsManagerImpl;

import javax.inject.Singleton;

import dagger.Binds;
import dagger.Module;

@Module
public interface DataAbstractModule {
    @Binds
        // Singleton annotation isn't necessary (in this case since Application instance is unique)
        // but is here for convention.
    AuthorisationInteractor authorisationWebInteractor(AuthorisationWebInteractor interactor);

    @Binds
    @Singleton
    WebRequestsManager webRequests(WebRequestsManagerImpl webRequests);

    //interactors
    @Binds
    @Singleton
    TranslationSyncInteractor translationSyncInteractor(TranslationSyncInteractorImpl interactor);

    @Binds
    @Singleton
    TranslationWordsInteractor translationWordsInteractor(TranslationWordsInteractorImpl interactor);

    @Binds
    @Singleton
    TranslationWordsRepositoryInteractor translationWordsCacheInteractor(TranslationWordsCacheInteractor interactor);

    //repos
    @Binds
    @Singleton
    @LocalRepository
    TranslationWordsLocalRepository translationWordsDatabaseRepository(TranslationWordsDatabaseRepository repository);

    @Binds
    @Singleton
    @CacheRepository
    TranslationWordsLocalRepository translationWordsCacheRepository(TranslationWordsCacheRepository repository);

    @Binds
    @Singleton
    TranslationWordsRemoteRepository translationWordsWebApiRepository(TranslationWordsWebApiRepository repository);
}
