package ru.inwords.inwords.presentation.viewScenario.translation.translationMain

import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import io.reactivex.Observable
import io.reactivex.disposables.Disposable
import io.reactivex.subjects.PublishSubject
import ru.inwords.inwords.core.util.Event
import ru.inwords.inwords.core.util.SchedulersFacade
import ru.inwords.inwords.data.dto.WordTranslation
import ru.inwords.inwords.data.repository.texttospeech.TtsRepository
import ru.inwords.inwords.domain.interactor.translation.TranslationSyncInteractor
import ru.inwords.inwords.domain.interactor.translation.TranslationWordsInteractor
import ru.inwords.inwords.domain.model.Resource
import ru.inwords.inwords.presentation.viewScenario.BasicViewModel
import java.util.concurrent.TimeUnit

class TranslationMainViewModel(private val translationWordsInteractor: TranslationWordsInteractor,
                               private val translationSyncInteractor: TranslationSyncInteractor,
                               private val ttsRepository: TtsRepository) : BasicViewModel() {
    private var onAddClickedDisposable: Disposable? = null
    private var onEditClickedDisposable: Disposable? = null
    private var onSpeakerClickedDisposable: Disposable? = null

    private val addEditWordMutableLiveData = MutableLiveData<Event<WordTranslation>>()
    private val ttsSubject = PublishSubject.create<Resource<String>>()

    val translationWordsStream: Observable<List<WordTranslation>> = translationWordsInteractor.getAllWords()
            .observeOn(SchedulersFacade.computation())
            .map { list -> list.sortedBy { it.wordNative } }

    val addEditWordLiveData: LiveData<Event<WordTranslation>> = addEditWordMutableLiveData
    val ttsStream: Observable<Resource<String>> = ttsSubject

    fun onItemDismiss(wordTranslation: WordTranslation) {
        translationWordsInteractor.remove(wordTranslation)
                .subscribe({ }, { Log.e(javaClass.simpleName, it.message.orEmpty()) })
                .autoDispose()
    }

    fun onItemDismissUndo(wordTranslation: WordTranslation) {
        translationWordsInteractor.addReplace(wordTranslation)
                .subscribe({ translationSyncInteractor.notifyDataChanged() }, { Log.e(javaClass.simpleName, it.message.orEmpty()) })
                .autoDispose()
    }

    fun onConfirmItemDismiss(wordTranslation: WordTranslation) {
        translationSyncInteractor.notifyDataChanged()

        ttsRepository.forget(wordTranslation.wordForeign)
                .subscribeOn(SchedulersFacade.io())
                .subscribe({}, { Log.e(javaClass.simpleName, it.message.orEmpty()) })
                .autoDispose()
    }

    fun onAddClickedHandler(clicksObservable: Observable<Any>) { //fab clicked
        onAddClickedDisposable?.dispose()

        onAddClickedDisposable = clicksObservable
                .debounce(200, TimeUnit.MILLISECONDS)
                .subscribe { addEditWordMutableLiveData.postValue(Event(WordTranslation("", ""))) }
                .autoDispose()
    }

    fun onEditClickedHandler(clicksObservable: Observable<WordTranslation>) { //clickListener on item
        onEditClickedDisposable?.dispose()

        onEditClickedDisposable = clicksObservable
                .debounce(200, TimeUnit.MILLISECONDS)
                .subscribe { addEditWordMutableLiveData.postValue(Event(it)) }
                .autoDispose()
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
}
