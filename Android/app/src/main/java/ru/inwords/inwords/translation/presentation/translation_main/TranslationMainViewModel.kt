package ru.inwords.inwords.translation.presentation.translation_main

import android.util.Log
import io.reactivex.Observable
import io.reactivex.disposables.Disposable
import io.reactivex.functions.BiFunction
import io.reactivex.subjects.BehaviorSubject
import io.reactivex.subjects.PublishSubject
import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import ru.inwords.inwords.presentation.view_scenario.BasicViewModel
import ru.inwords.inwords.texttospeech.data.repository.TtsRepository
import ru.inwords.inwords.translation.data.bean.WordTranslation
import ru.inwords.inwords.translation.domain.interactor.TranslationWordsInteractor
import java.util.Collections.singletonList
import java.util.concurrent.TimeUnit

class TranslationMainViewModel(private val translationWordsInteractor: TranslationWordsInteractor,
                               private val ttsRepository: TtsRepository) : BasicViewModel() {
    private var onSpeakerClickedDisposable: Disposable? = null

    private val ttsSubject = PublishSubject.create<Resource<String>>()

    private val filterSubject = BehaviorSubject.createDefault("")

    val translationWordsStream: Observable<List<WordTranslation>>
        get() = Observable.combineLatest(
            translationWordsInteractor.getAllWords()
                .map { list -> list.sortedBy { it.wordForeign } },
            filterSubject,
            BiFunction { t1: List<WordTranslation>, t2: String -> filter(t1, t2) })
            .observeOn(SchedulersFacade.computation())

    val ttsStream: Observable<Resource<String>> = ttsSubject

    fun onSearchQueryChange(query: String) {
        filterSubject.onNext(query)
    }

    fun onItemDismiss(wordTranslation: WordTranslation) = translationWordsInteractor.remove(wordTranslation)
        .subscribe({ }, { Log.e(javaClass.simpleName, it.message.orEmpty()) })
        .autoDispose()

    fun onItemsDismiss(wordTranslations: List<WordTranslation>) = translationWordsInteractor.removeAll(wordTranslations)
        .subscribe({ }, { Log.e(javaClass.simpleName, it.message.orEmpty()) })
        .autoDispose()

    fun onItemDismissUndo(wordTranslation: WordTranslation) = translationWordsInteractor.addReplace(wordTranslation)
        .subscribe({ translationWordsInteractor.notifyDataChanged() }, { Log.e(javaClass.simpleName, it.message.orEmpty()) })
        .autoDispose()


    fun onItemsDismissUndo(wordTranslations: List<WordTranslation>) = translationWordsInteractor.addReplaceAll(wordTranslations)
        .subscribe({ translationWordsInteractor.notifyDataChanged() }, { Log.e(javaClass.simpleName, it.message.orEmpty()) })
        .autoDispose()

    fun onConfirmItemDismiss(wordTranslation: WordTranslation) = onConfirmItemsDismiss(singletonList(wordTranslation))

    fun onConfirmItemsDismiss(wordTranslations: List<WordTranslation>) {
        translationWordsInteractor.notifyDataChanged()

        ttsRepository.forget(wordTranslations.map { it.wordForeign }) //TODO get wordForeign not here
            .subscribeOn(SchedulersFacade.io())
            .subscribe({}, { Log.e(javaClass.simpleName, it.message.orEmpty()) })
            .autoDispose()
    }

    fun onAddClicked() { //fab clicked
        navigateTo(
            TranslationMainFragmentDirections.actionTranslationMainFragmentToAddEditWordFragment(WordTranslation("", ""))
        )
    }

    fun onEditClicked(wordTranslation: WordTranslation) {
        navigateTo(
            TranslationMainFragmentDirections.actionTranslationMainFragmentToAddEditWordFragment(wordTranslation)
        )
    }

    fun onSpeakerClickedHandler(speakerObservable: Observable<WordTranslation>) {
        onSpeakerClickedDisposable?.dispose()

        onSpeakerClickedDisposable = speakerObservable
            .debounce(200, TimeUnit.MILLISECONDS)
            .switchMapSingle { wordTranslation ->
                ttsRepository.synthesize(wordTranslation.wordForeign)
                    .subscribeOn(SchedulersFacade.io())
                    .map { Resource.Success(it.absolutePath) as Resource<String> }
                    .onErrorReturn { Resource.Error(it.message, it) }
            }
            .subscribe({
                ttsSubject.onNext(it)
            }, {
                Log.e(javaClass.simpleName, it.message.orEmpty())
            })
            .autoDispose()
    }

    private fun filter(list: List<WordTranslation>, filter: String): List<WordTranslation> {
        return if (filter.isBlank()) {
            list
        } else {
            list.filter {
                it.wordForeign.contains(filter, true) || it.wordNative.contains(filter, true)
            }
        }
    }

    fun onPlayClicked(wordTranslations: List<WordTranslation>) {
        TranslationMainFragmentDirections.actionTranslationMainFragmentToCustomGameCreatorFragment(wordTranslations.toTypedArray())
    }
}
