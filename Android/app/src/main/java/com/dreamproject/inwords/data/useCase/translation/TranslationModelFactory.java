package com.dreamproject.inwords.data.useCase.translation;

import android.content.Context;

import com.dreamproject.inwords.data.interactor.translation.TranslationWordsCacheInteractor;
import com.dreamproject.inwords.data.interactor.translation.TranslationWordsInteractor;
import com.dreamproject.inwords.data.repository.translation.TranslationWordsCacheRepository;
import com.dreamproject.inwords.data.repository.translation.TranslationWordsDatabaseRepository;
import com.dreamproject.inwords.data.repository.translation.TranslationWordsLocalRepository;
import com.dreamproject.inwords.data.repository.translation.TranslationWordsRemoteRepository;
import com.dreamproject.inwords.data.repository.translation.TranslationWordsWebApiRepository;
import com.dreamproject.inwords.data.source.WebService.WebRequests;
import com.dreamproject.inwords.data.source.database.AppRoomDatabase;
import com.dreamproject.inwords.data.source.database.WordTranslationDao;
import com.dreamproject.inwords.data.sync.SyncController;

public class TranslationModelFactory {
    public static TranslationModelImpl createOne(Context context, WebRequests webRequests) {
        final TranslationWordsLocalRepository inMemoryRepository = new TranslationWordsCacheRepository();
        final TranslationWordsLocalRepository localRepository = new TranslationWordsDatabaseRepository(getWordTranslationDao(context));
        final TranslationWordsRemoteRepository remoteRepository = new TranslationWordsWebApiRepository(webRequests);

        TranslationWordsInteractor translationWordsInteractor = new TranslationWordsCacheInteractor(inMemoryRepository);

        SyncController syncController = new SyncController(inMemoryRepository, localRepository, remoteRepository);

        return new TranslationModelImpl(translationWordsInteractor, syncController);
    }

    private static WordTranslationDao getWordTranslationDao(Context context) {
        AppRoomDatabase db = AppRoomDatabase.getDatabase(context);
        return db.wordTranslationDao();
    }
}
