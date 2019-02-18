package com.dreamproject.inwords;

import android.support.test.InstrumentationRegistry;
import android.support.test.runner.AndroidJUnit4;

import com.dreamproject.inwords.data.dto.WordTranslation;
import com.dreamproject.inwords.data.repository.translation.TranslationWordsCacheRepository;
import com.dreamproject.inwords.data.repository.translation.TranslationWordsDatabaseRepository;
import com.dreamproject.inwords.data.repository.translation.TranslationWordsLocalRepository;
import com.dreamproject.inwords.data.repository.translation.TranslationWordsRemoteRepository;
import com.dreamproject.inwords.data.repository.translation.TranslationWordsWebApiRepository;
import com.dreamproject.inwords.data.source.webService.WebRequestsManagerImpl;
import com.dreamproject.inwords.data.sync.TranslationSyncController;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;

import java.util.Arrays;
import java.util.List;

import io.reactivex.observers.TestObserver;

@RunWith(AndroidJUnit4.class)
public class RepositoriesTest {
    private TranslationWordsLocalRepository inMemoryRepository;
    private TranslationWordsLocalRepository localRepository;
    private TranslationWordsRemoteRepository remoteRepository;

    @Before
    public void init() {
        inMemoryRepository = new TranslationWordsCacheRepository();
        localRepository = new TranslationWordsDatabaseRepository(InstrumentationRegistry.getTargetContext());
        remoteRepository = new TranslationWordsWebApiRepository(WebRequestsManagerImpl.INSTANCE);

        /*allListController = new RepositorySyncController<>(
                behaviorSubject,
                new WordsAllList(inMemoryRepository),
                new WordsAllList(localRepository),
                new WordsAllList(remoteRepository));*/

        TranslationSyncController translationSyncController = new TranslationSyncController(inMemoryRepository, localRepository, remoteRepository);
        translationSyncController.presyncOnStart()
                .blockingGet();
        translationSyncController.trySyncAllReposWithCache()
                .blockingSubscribe((wordTranslations) -> {
                }, Throwable::printStackTrace);
    }

    @Test
    public void localRepository_getList() {
        TestObserver<List<WordTranslation>> testSubscriber = new TestObserver<>();

        localRepository.getList()
                .blockingSubscribe(testSubscriber);

        testSubscriber
                .assertComplete()
                .assertResult(Arrays.asList(
                        new WordTranslation(1, 0, "asd", "ку"),
                        new WordTranslation(2, 0, "sdg", "укеу")));


    }
}
