package com.dreamproject.inwords.data.sync;

import com.dreamproject.inwords.dagger.annotations.CacheRepositoryQualifier;
import com.dreamproject.inwords.dagger.annotations.LocalRepositoryQualifier;
import com.dreamproject.inwords.data.entity.WordIdentificator;
import com.dreamproject.inwords.data.entity.WordTranslation;
import com.dreamproject.inwords.data.repository.translation.TranslationWordsLocalRepository;
import com.dreamproject.inwords.data.repository.translation.TranslationWordsRemoteRepository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

import javax.inject.Inject;

import io.reactivex.Completable;
import io.reactivex.Observable;
import io.reactivex.Single;
import io.reactivex.observables.GroupedObservable;
import io.reactivex.schedulers.Schedulers;
import io.reactivex.subjects.PublishSubject;

import static com.dreamproject.inwords.data.sync.TranslationSyncController.Groups.ADD;

public class TranslationSyncController {
    private TranslationWordsLocalRepository inMemoryRepository;
    private TranslationWordsLocalRepository localRepository;
    private TranslationWordsRemoteRepository remoteRepository;

    private AtomicInteger dataChangesCounter;
    private PublishSubject<Integer> dataChangedNotifier;

    @Inject
    public TranslationSyncController(
            @CacheRepositoryQualifier TranslationWordsLocalRepository inMemoryRepository,
            @LocalRepositoryQualifier TranslationWordsLocalRepository localRepository,
            TranslationWordsRemoteRepository remoteRepository) {
        this.inMemoryRepository = inMemoryRepository;
        this.localRepository = localRepository;
        this.remoteRepository = remoteRepository;

        this.dataChangedNotifier = PublishSubject.create();
        this.dataChangesCounter = new AtomicInteger();

        establishSyncAllReposWithCacheWatcher();
    }

    enum Groups {
        REMOVE_REMOTE, REMOVE_LOCAL, ADD, NORMAL
    }

    @SuppressWarnings("ResultOfMethodCallIgnored")
    private void establishSyncAllReposWithCacheWatcher() {
        dataChangedNotifier
                .debounce(3, TimeUnit.SECONDS)
                .doOnNext(o -> trySyncAllReposWithCache().subscribeOn(Schedulers.io())
                        .onErrorReturnItem(Collections.emptyList())
                        .ignoreElements()
                        .subscribe(() -> {
                        }))
                .subscribe();
    }

    public void notifyDataChanged() {
        dataChangedNotifier.onNext(dataChangesCounter.incrementAndGet());
    }

    public Single<PullWordsAnswer> presyncOnStart() {
        return localRepository.getList()
                .flatMapSingle(inMemoryRepository::addReplaceAll)
                .flatMap(Observable::fromIterable)
                .map(WordIdentificator::getServerId)
                .filter(serverId -> serverId != 0)
                .toList()
                .doOnError(Throwable::printStackTrace)
                .flatMap(remoteRepository::pullWords)
                .doOnError(Throwable::printStackTrace)
                .doOnSuccess(pullWordsAnswer -> {
                    List<Integer> removedServerIds = pullWordsAnswer.getRemovedServerIds();
                    List<WordTranslation> addedWords = pullWordsAnswer.getAddedWords();

                    if (!removedServerIds.isEmpty()) {  //Its IMPORTANT to remove before addReplace because
                                                        //its important
                        Throwable throwable = Completable.mergeDelayError(
                                Arrays.asList(
                                        localRepository.removeAllServerIds(removedServerIds),
                                        inMemoryRepository.removeAllServerIds(removedServerIds)
                                ))
                                .blockingGet();

                        if (throwable != null)
                            throwable.printStackTrace();
                    }

                    if (!addedWords.isEmpty())
                        Single.mergeDelayError(
                                localRepository.addReplaceAll(addedWords),
                                inMemoryRepository.addReplaceAll(addedWords))
                                .blockingSubscribe(wordTranslations -> {
                                }, Throwable::printStackTrace);
                })
                .subscribeOn(Schedulers.io());
    }

    public Observable<List<WordTranslation>> trySyncAllReposWithCache() {
        return inMemoryRepository.getList()
                .observeOn(Schedulers.computation())
                .firstElement() //Берём все элементы только 1 раз
                .flatMapObservable(Observable::fromIterable) //Выдаём их по одному
                .groupBy(this::group) //Группируем
                .flatMapSingle(GroupedObservable::toList) //Каждую группу пихаем в List
                .filter(wordTranslations -> !wordTranslations.isEmpty()) //Смотрим, чтобы он был не пустой
                .observeOn(Schedulers.io())
                .doOnNext(this::groupedListHandler);
    }

    private Groups group(WordTranslation wordTranslation) {
        int serverId = wordTranslation.getWordIdentificator().getServerId();

        if (serverId == 0)
            return ADD;
        else if (wordTranslation.isLocallyDeleted())
            return Groups.REMOVE_LOCAL;
        else if (wordTranslation.isRemoteDeleted())
            return Groups.REMOVE_REMOTE;

        return Groups.NORMAL;
    }

    private void groupedListHandler(List<WordTranslation> list) {
        if (list.isEmpty())
            return;

        Throwable throwable = null;
        switch (group(list.get(0))) { //Узнаём какой группе принадлежит лист
            case ADD: {
                throwable = localRepository.addReplaceAll(list)
                        .doOnSuccess(wordTranslations -> remoteRepository.addAll(wordTranslations)
                                .doOnSuccess(wordIdentificatorsRemote -> {
                                    if (!wordTranslations.isEmpty() && !wordIdentificatorsRemote.isEmpty()) {
                                        mergeIds(wordTranslations, wordIdentificatorsRemote);

                                        Single.mergeDelayError(
                                                localRepository.addReplaceAll(wordTranslations),
                                                inMemoryRepository.addReplaceAll(wordTranslations))
                                                .blockingSubscribe();
                                    }
                                })
                                .doOnError((t) -> {
                                    if (!wordTranslations.isEmpty())
                                        inMemoryRepository.addReplaceAll(wordTranslations).blockingGet();
                                })
                                .blockingGet()
                        )
                        .ignoreElement()
                        .blockingGet();

                break;
            }

            case REMOVE_REMOTE: {
                List<Integer> serverIds = serverIdsFromWordTranslations(list);
                throwable = remoteRepository.removeAllServerIds(serverIds)
                        .doOnComplete(() -> { //TODO
                            if (!serverIds.isEmpty()) {
                                Throwable t = Completable.mergeDelayError(Arrays.asList(
                                        inMemoryRepository.removeAllServerIds(serverIds),
                                        localRepository.removeAllServerIds(serverIds)))
                                        .blockingGet();

                                if (t != null)
                                    t.printStackTrace();
                            }
                        })
                        .blockingGet();

                break;
            }

            case REMOVE_LOCAL: {
                throwable = Completable.mergeDelayError(Arrays.asList(
                        inMemoryRepository.removeAll(list),
                        localRepository.removeAll(list)))
                        .blockingGet();

                break;
            }

            case NORMAL:
            default:
                break;
        }

        if (throwable != null)
            throwable.printStackTrace();
    }

    private void mergeIds(List<WordTranslation> list, List<WordIdentificator> listIds) {
        for (WordTranslation wordTranslation : list) {
            for (WordIdentificator wordIdentificator : listIds) {
                if (wordIdentificator.getId() == wordTranslation.getId()) {
                    wordTranslation.setServerId((wordIdentificator.getServerId()));
                }
            }
        }
    }

    private List<Integer> serverIdsFromWordTranslations(List<? extends WordIdentificator> wordIdentificators) {
        List<Integer> serverIds = new ArrayList<>();

        for (WordIdentificator wordTranslation : wordIdentificators) {
            serverIds.add(wordTranslation.getServerId());
        }

        return serverIds;
    }

}
