package com.dreamproject.inwords.data.sync;

import com.dreamproject.inwords.data.entity.WordTranslation;
import com.dreamproject.inwords.data.repository.Translation.TranslationWordsRepository;

import io.reactivex.Completable;
import io.reactivex.Observable;
import io.reactivex.disposables.Disposable;
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

    public void perf() {
        Disposable d = inMemoryRepository.getList()
                .firstElement() //Берём все элементы только 1 раз
                .flatMapObservable(Observable::fromIterable) //Выдаём их по одному
                .groupBy(this::group) //Группируем
                .flatMapSingle(GroupedObservable::toList) //Каждую группу пихаем в List
                .filter(wordTranslations -> !wordTranslations.isEmpty()) //Смотрим, чтобы он был не пустой
                .doOnNext(list -> {  //Для каждого сгруппированного листа выполняем действия
                    switch (group(list.get(0))) { //Узнаём какой группе принадлежит лист
                        case ADD:
                            remoteRepository.addAll(list).subscribe();
                            localRepository.addAll(list).subscribe();
                            break;

                        case REMOVE:
                            remoteRepository.removeAll(list).subscribe(() -> {
                                        inMemoryRepository.removeAll(list);
                                        localRepository.removeAll(list);
                                    },
                                    Throwable::printStackTrace);
                            break;

                        case NORMAL:
                        default:
                            break;
                    }
                })
                .subscribe(list -> {
                        },
                        Throwable::printStackTrace);

    }

    private Groups group(WordTranslation wordTranslation) {
        int serverId = wordTranslation.getServerId();

        if (serverId == 0)
            return ADD;
        else if (serverId < 0)
            return Groups.REMOVE;

        return Groups.NORMAL;
    }

    public Completable syncKostil() {
        return Completable.fromCallable(() -> {


            Observable.zip(remoteRepository.getList(), localRepository.getList(), (listRemote, listLocal) -> {
                localRepository.addAll(listRemote)
                        .subscribe();
                remoteRepository.addAll(listLocal)
                        .subscribe();

                listLocal.addAll(listRemote);
                inMemoryRepository.addAll(listLocal)
                        .subscribe();

                return listLocal;
            })
                    .subscribeOn(Schedulers.io())
                    .blockingSubscribe((wordTranslations) -> {
                    }, Throwable::printStackTrace);


            return true;
        });
    }


}
