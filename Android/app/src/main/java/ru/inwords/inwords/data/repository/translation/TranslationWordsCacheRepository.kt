package ru.inwords.inwords.data.repository.translation

import io.reactivex.Completable
import io.reactivex.Observable
import io.reactivex.Single
import io.reactivex.subjects.BehaviorSubject
import ru.inwords.inwords.core.util.SchedulersFacade
import ru.inwords.inwords.data.dto.WordTranslation
import java.util.*
import java.util.concurrent.ConcurrentHashMap
import javax.inject.Inject

class TranslationWordsCacheRepository @Inject
internal constructor() : TranslationWordsLocalRepository {
    private val list: ConcurrentHashMap<WordTranslation, WordTranslation> = ConcurrentHashMap()

    private val behaviorSubject = BehaviorSubject.createDefault(Collections.list(list.elements()))

    override fun getByOne(): Observable<WordTranslation> {
        return getList()
                .flatMap { Observable.fromIterable(it) }
    }

    override fun getList(): Observable<List<WordTranslation>> {
        return behaviorSubject
                .observeOn(SchedulersFacade.io())
                //.filter(wordTranslations -> !wordTranslations.isEmpty())
                .map { ArrayList(it) }
    }

    override fun addReplace(wordTranslation: WordTranslation): Single<WordTranslation> {
        return Single.defer {
            val storedItem = list[wordTranslation]
            val itemToAdd = if (storedItem == null) {
                WordTranslation(wordTranslation.wordForeign, wordTranslation.wordNative)
            } else {
                wordTranslation
            }
            list[itemToAdd] = itemToAdd

            Single.just(itemToAdd)
                    .doOnSuccess { publish() }
        }
    }

    override fun addReplaceAll(wordTranslations: List<WordTranslation>): Single<List<WordTranslation>> {
        return if (wordTranslations.isEmpty()) {
            Single.just(wordTranslations)
        } else Single.defer {
            //list.removeAll(wordTranslations);
            for (wordTranslation in wordTranslations) {
                list[wordTranslation] = wordTranslation
            }

            Single.just(wordTranslations)
                    .doOnSuccess { publish() }
        }

    }

    override fun removeAll(wordTranslations: List<WordTranslation>): Completable {
        return if (wordTranslations.isEmpty()) {
            Completable.complete()
        } else {
            Completable.fromCallable {
                list.keys.removeAll(wordTranslations)

                publish()

                true
            }
        }

    }

    override fun removeAllServerIds(serverIds: List<Int>): Completable {
        return if (serverIds.isEmpty()) {
            Completable.complete()
        } else {
            Completable.fromCallable {
                for (serverId in serverIds) {
                    val it = list.values.iterator()
                    while (it.hasNext()) {
                        val next = it.next()
                        if (next.serverId == serverId) {
                            it.remove()
                        }
                    }
                }

                publish()

                true
            }
        }
    }

    override fun clear() = list.clear()

    private fun publish() {
        behaviorSubject.onNext(Collections.list(list.elements()))
    }
}
