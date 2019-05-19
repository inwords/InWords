package ru.inwords.inwords.presentation.viewScenario.translation.translationMain

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import io.reactivex.Observable
import io.reactivex.Single
import ru.inwords.inwords.core.util.Event
import ru.inwords.inwords.data.dto.WordTranslation
import ru.inwords.inwords.data.repository.texttospeech.TtsRepository
import ru.inwords.inwords.domain.interactor.translation.TranslationSyncInteractor
import ru.inwords.inwords.domain.interactor.translation.TranslationWordsInteractor
import ru.inwords.inwords.presentation.viewScenario.BasicViewModel
import java.io.File
import java.util.concurrent.TimeUnit

class TranslationMainViewModel(private val translationWordsInteractor: TranslationWordsInteractor,
                               private val translationSyncInteractor: TranslationSyncInteractor,
                               private val ttsRepository: TtsRepository) : BasicViewModel() {
    private val addEditWordMutableLiveData: MutableLiveData<Event<WordTranslation>> = MutableLiveData()

    val translationWordsStream: Observable<List<WordTranslation>>
        get() = translationWordsInteractor.allWords

    val addEditWordLiveData: LiveData<Event<WordTranslation>> get() = addEditWordMutableLiveData

    fun synthesize(textToSpeak: String): Single<File> {
        return ttsRepository.synthesize(textToSpeak)
    }

    fun onItemDismiss(wordTranslation: WordTranslation) {
        compositeDisposable.add(translationWordsInteractor.remove(wordTranslation)
                .subscribe({ translationSyncInteractor.notifyDataChanged() }, { it.printStackTrace() }))
    }

    fun onAddClickedHandler(clicksObservable: Observable<Any>) { //fab clicked
        compositeDisposable.add(clicksObservable
                .debounce(200, TimeUnit.MILLISECONDS)
                .subscribe { addEditWordMutableLiveData.postValue(Event<WordTranslation>(null)) })
    }

    fun onEditClicked(clicksObservable: Observable<WordTranslation>) { //clickListener on item
        compositeDisposable.add(clicksObservable
                .debounce(200, TimeUnit.MILLISECONDS)
                .subscribe { wordTranslation -> addEditWordMutableLiveData.postValue(Event(wordTranslation)) })
    }
}
