package com.dreamproject.inwords.model;

import android.app.Application;

import com.dreamproject.inwords.data.repository.Translation.TranslationWordsCacheInteractor;
import com.dreamproject.inwords.data.repository.Translation.TranslationWordsCacheRepository;
import com.dreamproject.inwords.data.repository.Translation.TranslationWordsDatabaseRepository;
import com.dreamproject.inwords.data.repository.Translation.TranslationWordsInteractor;
import com.dreamproject.inwords.data.repository.Translation.TranslationWordsLocalRepository;
import com.dreamproject.inwords.data.repository.Translation.TranslationWordsRemoteRepository;
import com.dreamproject.inwords.data.repository.Translation.TranslationWordsWebApiRepository;
import com.dreamproject.inwords.data.source.WebService.WebRequests;
import com.dreamproject.inwords.data.sync.SyncController;

public class MainModelFactory {
    public static MainModelImpl createOne(Application application, WebRequests webRequests) {
        final TranslationWordsLocalRepository inMemoryRepository = new TranslationWordsCacheRepository();
        final TranslationWordsLocalRepository localRepository = new TranslationWordsDatabaseRepository(application);
        final TranslationWordsRemoteRepository remoteRepository = new TranslationWordsWebApiRepository(webRequests);

        TranslationWordsInteractor translationWordsInteractor = new TranslationWordsCacheInteractor(inMemoryRepository);

        SyncController syncController = new SyncController(inMemoryRepository, localRepository, remoteRepository);

        return new MainModelImpl(translationWordsInteractor, syncController);
    }
}
