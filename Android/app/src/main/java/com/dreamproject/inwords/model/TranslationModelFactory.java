package com.dreamproject.inwords.model;

import android.content.Context;

import com.dreamproject.inwords.data.repository.Translation.TranslationWordsCacheInteractor;
import com.dreamproject.inwords.data.repository.Translation.TranslationWordsCacheRepository;
import com.dreamproject.inwords.data.repository.Translation.TranslationWordsDatabaseRepository;
import com.dreamproject.inwords.data.repository.Translation.TranslationWordsInteractor;
import com.dreamproject.inwords.data.repository.Translation.TranslationWordsLocalRepository;
import com.dreamproject.inwords.data.repository.Translation.TranslationWordsRemoteRepository;
import com.dreamproject.inwords.data.repository.Translation.TranslationWordsWebApiRepository;
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
