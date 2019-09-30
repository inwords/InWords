package ru.inwords.inwords.data.sync

import android.util.Log
import io.reactivex.Completable
import io.reactivex.Observable
import io.reactivex.Single
import io.reactivex.schedulers.Schedulers
import io.reactivex.subjects.PublishSubject
import ru.inwords.inwords.core.util.SchedulersFacade
import ru.inwords.inwords.dagger.annotations.LocalRepository
import ru.inwords.inwords.data.dto.*
import ru.inwords.inwords.data.repository.translation.TranslationWordsLocalRepository
import ru.inwords.inwords.data.repository.translation.TranslationWordsRemoteRepository
import ru.inwords.inwords.domain.util.serverIdsFromWordTranslations
import java.util.concurrent.TimeUnit
import java.util.concurrent.atomic.AtomicInteger
import javax.inject.Inject

class TranslationSyncController @Inject
internal constructor(
        @param:LocalRepository private val localRepository: TranslationWordsLocalRepository,
        private val remoteRepository: TranslationWordsRemoteRepository) {

    private val dataChangesCounter: AtomicInteger = AtomicInteger()
    private val dataChangedNotifier: PublishSubject<Int> = PublishSubject.create()

    init {
        establishSyncAllReposWithCacheWatcher()
    }

    internal enum class Groups {
        REMOVE_REMOTE, REMOVE_LOCAL, ADD, NORMAL
    }

    private fun establishSyncAllReposWithCacheWatcher() {
        dataChangedNotifier
                .debounce(2, TimeUnit.SECONDS)
                .doOnNext {
                    trySyncRemoteReposWithLocal()
                            .subscribeOn(Schedulers.io())
                            .subscribe({ }, { t -> Log.e("TranslationSync", "" + t.message.orEmpty()) })
                }
                .subscribe()
    }

    fun notifyDataChanged() {
        dataChangedNotifier.onNext(dataChangesCounter.incrementAndGet())
    }

    fun presyncOnStart(): Single<PullWordsAnswer> {
        return localRepository.getList().firstOrError() //TODO
                .map { wordTranslations ->
                    wordTranslations.filter { it.serverId != 0 }.map { it.serverId }
                }
                .doOnError { t -> Log.e(this.javaClass.simpleName, t.message.orEmpty()) }
                .flatMap { remoteRepository.pullWords(it) }
                .doOnError { t -> Log.e(this.javaClass.simpleName, t.message.orEmpty()) }
                .doOnSuccess { pullWordsAnswer ->
                    val removedServerIds = pullWordsAnswer.removedServerIds
                    val addedWords = pullWordsAnswer.addedWords

                    if (removedServerIds.isNotEmpty()) {
                        //Its IMPORTANT to remove before addReplace because its important
                        localRepository.removeAllServerIds(removedServerIds).blockingGet()
                                ?.let {
                                    Log.e(this.javaClass.simpleName, it.message.orEmpty())
                                }
                    }

                    if (addedWords.isNotEmpty()) {
                        localRepository.addReplaceAll(addedWords)
                                .doOnError { Log.e(this.javaClass.simpleName, it.message.orEmpty()) }
                                .onErrorReturnItem(emptyList())
                                .blockingGet()
                    }
                }
                .subscribeOn(SchedulersFacade.io())
    }

    fun trySyncRemoteReposWithLocal(): Completable {
        return localRepository.getList()
                .observeOn(SchedulersFacade.computation())
                .firstElement() //Берём все элементы только 1 раз
                .flatMapObservable { Observable.fromIterable(it) } //Выдаём их по одному
                .groupBy { group(it) } //Группируем
                .flatMapSingle { it.toList() } //Каждую группу пихаем в List
                .filter { wordTranslations -> wordTranslations.isNotEmpty() } //Смотрим, чтобы он был не пустой
                .observeOn(SchedulersFacade.io())
                .flatMapCompletable { groupedListHandler(it) }
    }

    private fun group(wordTranslation: WordTranslation): Groups {
        val serverId = wordTranslation.serverId

        return when {
            serverId == 0 -> Groups.ADD
            wordTranslation.isLocallyDeleted -> Groups.REMOVE_LOCAL
            wordTranslation.isRemoteDeleted -> Groups.REMOVE_REMOTE
            else -> Groups.NORMAL
        }
    }

    private fun groupedListHandler(list: List<WordTranslation>): Completable {
        if (list.isEmpty()) {
            return Completable.complete()
        }

        return when (group(list[0])) {
            //Узнаём какой группе принадлежит лист
            Groups.ADD -> {
                remoteRepository
                        .addAll(list)
                        .flatMapCompletable { wordIdentificatorsRemote ->
                            localRepository.addReplaceAll(mergeIds(list, wordIdentificatorsRemote)).ignoreElement()
                        }
                        .doOnError { t -> Log.e(this.javaClass.simpleName, t.message.orEmpty()) }
                        .onErrorComplete() //TODO

            }

            Groups.REMOVE_REMOTE -> {
                val serverIds = serverIdsFromWordTranslations(list)
                remoteRepository.removeAllServerIds(serverIds)
                        .andThen(localRepository.removeAllServerIds(serverIds))
            }

            Groups.REMOVE_LOCAL -> {
                localRepository.removeAll(list)
            }

            Groups.NORMAL -> {
                Completable.complete()
            }
        }
    }

    private fun mergeIds(list: List<WordTranslation>, listIds: List<EntityIdentificator>): List<WordTranslation> {
        if (list.isEmpty()) {
            return emptyList()
        }

        if (listIds.isEmpty()) {
            return list
        }

        val newList = mutableListOf<WordTranslation>()

        list.forEach { wordTranslation ->
            listIds.find { it.id == wordTranslation.id }?.let { newList.add(wordTranslation.withServerId(it.serverId)) }
        }

        return newList
    }

}
