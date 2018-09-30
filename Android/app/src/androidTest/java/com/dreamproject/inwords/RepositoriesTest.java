package com.dreamproject.inwords;

import android.support.test.InstrumentationRegistry;
import android.support.test.runner.AndroidJUnit4;

import com.dreamproject.inwords.data.entity.WordTranslation;
import com.dreamproject.inwords.data.repository.Translation.TranslationWordsCacheRepository;
import com.dreamproject.inwords.data.repository.Translation.TranslationWordsLocalRepository;
import com.dreamproject.inwords.data.repository.Translation.TranslationWordsRemoteRepository;
import com.dreamproject.inwords.data.repository.Translation.TranslationWordsRepository;
import com.dreamproject.inwords.data.sync.SyncController;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;

import java.util.Arrays;
import java.util.List;

import io.reactivex.observers.TestObserver;

@RunWith(AndroidJUnit4.class)
public class RepositoriesTest {
    private TranslationWordsRepository inMemoryRepository;
    private TranslationWordsRepository localRepository;
    private TranslationWordsRepository remoteRepository;

    @Before
    public void init() {
        inMemoryRepository = new TranslationWordsCacheRepository();
        localRepository = new TranslationWordsLocalRepository(InstrumentationRegistry.getTargetContext());
        remoteRepository = new TranslationWordsRemoteRepository();

        /*allListController = new RepositorySyncController<>(
                behaviorSubject,
                new WordsAllList(inMemoryRepository),
                new WordsAllList(localRepository),
                new WordsAllList(remoteRepository));*/

        SyncController syncController = new SyncController(inMemoryRepository, localRepository, remoteRepository);
        syncController.populateReposFromSources()
                .blockingSubscribe((wordTranslations) -> {
                }, Throwable::printStackTrace);
        syncController.trySyncAllReposWithCache()
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
