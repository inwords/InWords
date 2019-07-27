package ru.inwords.inwords.data.sync;

import android.util.Log;
import io.reactivex.Completable;
import io.reactivex.Observable;
import io.reactivex.Single;
import io.reactivex.observables.GroupedObservable;
import io.reactivex.schedulers.Schedulers;
import io.reactivex.subjects.PublishSubject;
import ru.inwords.inwords.core.util.SchedulersFacade;
import ru.inwords.inwords.dagger.annotations.CacheRepository;
import ru.inwords.inwords.dagger.annotations.LocalRepository;
import ru.inwords.inwords.data.dto.EntityIdentificator;
import ru.inwords.inwords.data.dto.WordTranslation;
import ru.inwords.inwords.data.repository.translation.TranslationWordsLocalRepository;
import ru.inwords.inwords.data.repository.translation.TranslationWordsRemoteRepository;
import ru.inwords.inwords.domain.util.WordsUtilKt;

import javax.inject.Inject;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

public class TranslationSyncController {
    private final TranslationWordsLocalRepository inMemoryRepository;
    private final TranslationWordsLocalRepository localRepository;
    private final TranslationWordsRemoteRepository remoteRepository;

    private final AtomicInteger dataChangesCounter;
    private final PublishSubject<Integer> dataChangedNotifier;

    @Inject
    TranslationSyncController(
            @CacheRepository TranslationWordsLocalRepository inMemoryRepository,
            @LocalRepository TranslationWordsLocalRepository localRepository,
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
                .debounce(2, TimeUnit.SECONDS)
                .doOnNext(o -> trySyncAllReposWithCache()
                        .subscribeOn(Schedulers.io())
                        .subscribe(() -> {
                        }, t -> Log.e("TranslationSync", "" + t.getMessage())))
                .subscribe();
    }

    public void notifyDataChanged() {
        dataChangedNotifier.onNext(dataChangesCounter.incrementAndGet());
    }

    public Single<PullWordsAnswer> presyncOnStart() {
        return localRepository.getList()
                .flatMapSingle(inMemoryRepository::addReplaceAll)
                .flatMap(Observable::fromIterable)
                .map(EntityIdentificator::getServerId)
                .filter(serverId -> serverId != 0)
                .toList()
                .doOnError(t -> Log.e(this.getClass().getSimpleName(), "" + t.getMessage()))
                .flatMap(remoteRepository::pullWords)
                .doOnError(t -> Log.e(this.getClass().getSimpleName(), "" + t.getMessage()))
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

                        if (throwable != null) {
                            Log.e(this.getClass().getSimpleName(), "" + throwable.getMessage());
                        }
                    }

                    if (!addedWords.isEmpty()) {
                        Single.mergeDelayError(
                                localRepository.addReplaceAll(addedWords),
                                inMemoryRepository.addReplaceAll(addedWords))
                                .blockingSubscribe(wordTranslations -> {
                                }, t -> Log.e(this.getClass().getSimpleName(), "" + t.getMessage()));
                    }
                })
                .subscribeOn(SchedulersFacade.INSTANCE.io());
    }

    public Completable trySyncAllReposWithCache() {
        return inMemoryRepository.getList()
                .observeOn(SchedulersFacade.INSTANCE.computation())
                .firstElement() //Берём все элементы только 1 раз
                .flatMapObservable(Observable::fromIterable) //Выдаём их по одному
                .groupBy(this::group) //Группируем
                .flatMapSingle(GroupedObservable::toList) //Каждую группу пихаем в List
                .filter(wordTranslations -> !wordTranslations.isEmpty()) //Смотрим, чтобы он был не пустой
                .observeOn(SchedulersFacade.INSTANCE.io())
                .flatMapCompletable(this::groupedListHandler);
    }

    private Groups group(WordTranslation wordTranslation) {
        int serverId = wordTranslation.getWordIdentificator().getServerId();

        if (serverId == 0) {
            return Groups.ADD;
        } else if (wordTranslation.isLocallyDeleted()) {
            return Groups.REMOVE_LOCAL;
        } else if (wordTranslation.isRemoteDeleted()) {
            return Groups.REMOVE_REMOTE;
        }

        return Groups.NORMAL;
    }

    private Completable groupedListHandler(List<WordTranslation> list) {
        if (list.isEmpty()) {
            return Completable.complete();
        }

        switch (group(list.get(0))) { //Узнаём какой группе принадлежит лист
            case ADD: {
                return localRepository
                        .addReplaceAll(list)
                        .flatMapCompletable(wordTranslations -> remoteRepository
                                .addAll(wordTranslations)
                                .flatMapCompletable(wordIdentificatorsRemote -> {
                                    mergeIds(wordTranslations, wordIdentificatorsRemote);

                                    return Single.mergeDelayError(
                                            localRepository.addReplaceAll(wordTranslations),
                                            inMemoryRepository.addReplaceAll(wordTranslations)).ignoreElements();

                                })
                                .onErrorResumeNext(__ -> inMemoryRepository.addReplaceAll(wordTranslations).ignoreElement())
                        );
            }

            case REMOVE_REMOTE: {
                List<Integer> serverIds = WordsUtilKt.serverIdsFromWordTranslations(list);
                return remoteRepository.removeAllServerIds(serverIds)
                        .andThen(Completable.mergeDelayError(Arrays.asList(
                                inMemoryRepository.removeAllServerIds(serverIds),
                                localRepository.removeAllServerIds(serverIds))));
            }

            case REMOVE_LOCAL: {
                return Completable.mergeDelayError(Arrays.asList(
                        inMemoryRepository.removeAll(list),
                        localRepository.removeAll(list)));
            }

            case NORMAL:
            default:
                return Completable.complete();
        }
    }

    private void mergeIds(Collection<? extends WordTranslation> list, Collection<? extends EntityIdentificator> listIds) {
        if (list.isEmpty() || listIds.isEmpty()) {
            return;
        }

        for (WordTranslation wordTranslation : list) {
            for (EntityIdentificator entityIdentificator : listIds) {
                if (entityIdentificator.getId() == wordTranslation.getId()) {
                    wordTranslation.setServerId((entityIdentificator.getServerId()));
                }
            }
        }
    }

}
