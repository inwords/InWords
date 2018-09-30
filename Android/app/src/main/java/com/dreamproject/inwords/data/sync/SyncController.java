package com.dreamproject.inwords.data.sync;

import com.dreamproject.inwords.data.entity.WordTranslation;
import com.dreamproject.inwords.data.repository.Translation.TranslationWordsRepository;

import java.util.ArrayList;
import java.util.List;

import io.reactivex.Observable;
import io.reactivex.Single;
import io.reactivex.observables.GroupedObservable;
import io.reactivex.schedulers.Schedulers;

import static com.dreamproject.inwords.data.sync.SyncController.Groups.ADD;

public class SyncController {
    private TranslationWordsRepository inMemoryRepository;
    private TranslationWordsRepository localRepository;
    private TranslationWordsRepository remoteRepository;

    public SyncController(TranslationWordsRepository inMemoryRepository, TranslationWordsRepository localRepository, TranslationWordsRepository remoteRepository) {
        this.inMemoryRepository = inMemoryRepository;
        this.localRepository = localRepository;
        this.remoteRepository = remoteRepository;
    }

    enum Groups {
        REMOVE, ADD, NORMAL
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
        else if (serverId < 0)
            return Groups.REMOVE;

        return Groups.NORMAL;
    }

    private void groupedListHandler(List<WordTranslation> list) {
        if (list.isEmpty())
            return;

        switch (group(list.get(0))) { //Узнаём какой группе принадлежит лист
            case ADD:
                localRepository.addAll(list)
                        .doOnSuccess(wordTranslationsLocal -> remoteRepository.addAll(wordTranslationsLocal)
                                .doOnSuccess((wordTranslationsRemote) ->
                                        Single.mergeDelayError(
                                                localRepository.addAll(wordTranslationsRemote),
                                                inMemoryRepository.addAll(wordTranslationsRemote))
                                                .blockingSubscribe())
                                .doOnError((throwable) -> {
                                    inMemoryRepository.addAll(wordTranslationsLocal).blockingGet();
                                    throwable.printStackTrace();
                                })
                                .blockingGet()
                        )
                        .doOnError(Throwable::printStackTrace)
                        .blockingGet();
                break;

            case REMOVE:
                remoteRepository.removeAll(list)
                        .doOnSuccess(wordIdentificators1 -> { //TODO
                            inMemoryRepository.removeAll(list);
                            localRepository.removeAll(list);
                        })
                        .doOnError(Throwable::printStackTrace)
                        .blockingGet();
                break;

            case NORMAL:
            default:
                break;
        }
    }

    public Observable<List<WordTranslation>> populateReposFromSources() {
        return Observable.fromCallable(() -> {
            List<WordTranslation> listRemote = remoteRepository.getList().blockingFirst(new ArrayList<>());
            List<WordTranslation> listLocal = localRepository.getList().blockingFirst(new ArrayList<>());

            Single.mergeDelayError(
                    localRepository.addAll(listRemote),
                    inMemoryRepository.addAll(listLocal))
                    .blockingSubscribe(wordTranslations -> {
                    }, Throwable::printStackTrace);

            listLocal.addAll(listRemote);
            inMemoryRepository.addAll(listLocal)
                    .blockingGet();

            return listLocal;
        })
                .subscribeOn(Schedulers.io());
    }


}
