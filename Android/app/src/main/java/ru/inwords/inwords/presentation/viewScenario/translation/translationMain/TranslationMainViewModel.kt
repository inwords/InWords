package ru.inwords.inwords.presentation.viewScenario.translation.translationMain

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

    private val addEditWordMutableLiveData: MutableLiveData<Event<WordTranslation>> = MutableLiveData()
    private val ttsSubject: PublishSubject<Resource<String>> = PublishSubject.create()

    val translationWordsStream: Observable<List<WordTranslation>>
        get() = translationWordsInteractor.getAllWords()
                .observeOn(SchedulersFacade.computation())
                .map { list -> list.sortedBy { it.wordNative } }

    val addEditWordLiveData: LiveData<Event<WordTranslation>> get() = addEditWordMutableLiveData
    val ttsStream: Observable<Resource<String>> get() = ttsSubject

    fun onItemDismiss(wordTranslation: WordTranslation) {
        compositeDisposable.add(translationWordsInteractor.remove(wordTranslation)
                .subscribe({ }, { it.printStackTrace() }))
    }

    fun onItemDismissUndo(wordTranslation: WordTranslation) {
        compositeDisposable.add(translationWordsInteractor.addReplace(wordTranslation)
                .subscribe({ translationSyncInteractor.notifyDataChanged() }, { it.printStackTrace() }))
    }

    fun onConfirmItemDismiss() {
        translationSyncInteractor.notifyDataChanged()
    }

    fun onAddClickedHandler(clicksObservable: Observable<Any>) { //fab clicked
        onAddClickedDisposable?.dispose()

        onAddClickedDisposable = clicksObservable
                .debounce(200, TimeUnit.MILLISECONDS)
                .subscribe { addEditWordMutableLiveData.postValue(Event(WordTranslation("", ""))) }
                .also { compositeDisposable.add(it) }
    }

    fun onEditClickedHandler(clicksObservable: Observable<WordTranslation>) { //clickListener on item
        onEditClickedDisposable?.dispose()

        onEditClickedDisposable = clicksObservable
                .debounce(200, TimeUnit.MILLISECONDS)
                .subscribe { addEditWordMutableLiveData.postValue(Event(it)) }
                .also { compositeDisposable.add(it) }
    }

    fun onSpeakerClickedHandler(speakerObservable: Observable<WordTranslation>) {
        onSpeakerClickedDisposable?.dispose()

        onSpeakerClickedDisposable = speakerObservable
                .debounce(200, TimeUnit.MILLISECONDS)
                .switchMapSingle { ttsRepository.synthesize(it.wordForeign) }
                .subscribe({
                    ttsSubject.onNext(Resource.Success(it.absolutePath))
                }, {
                    ttsSubject.onNext(Resource.Error(it.message))
                    it.printStackTrace()
                })
                .also { compositeDisposable.add(it) }
    }
}
