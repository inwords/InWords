package ru.inwords.inwords.translation.presentation.view.add_edit_word

import android.annotation.SuppressLint
import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import ru.inwords.inwords.core.Event
import ru.inwords.inwords.presentation.view_scenario.BasicViewModel
import ru.inwords.inwords.translation.data.bean.WordTranslation
import ru.inwords.inwords.translation.domain.interactor.TranslationSyncInteractor
import ru.inwords.inwords.translation.domain.interactor.TranslationWordsInteractor

class AddEditWordViewModel(private val translationWordsInteractor: TranslationWordsInteractor,
                           private val translationSyncInteractor: TranslationSyncInteractor) : BasicViewModel() {
    private val addEditDoneMutableLiveData: MutableLiveData<Event<Unit>> = MutableLiveData()

    val addEditDoneLiveData: LiveData<Event<Unit>> get() = addEditDoneMutableLiveData

    fun onEditWordDoneHandler(word: WordTranslation, wordToEdit: WordTranslation) {
        onAddEditWordDoneHandler(word, wordToEdit)
    }

    fun onAddWordDoneHandler(word: WordTranslation) {
        onAddEditWordDoneHandler(word, null)
    }

    @SuppressLint("CheckResult")
    private fun onAddEditWordDoneHandler(word: WordTranslation,
                                         wordToEdit: WordTranslation?) {
        if (word != wordToEdit) {
            val action = if (wordToEdit == null) {
                translationWordsInteractor.addReplace(word)
            } else {
                translationWordsInteractor.update(wordToEdit, word)
            }
            action.subscribe({
                translationSyncInteractor.notifyDataChanged()
            }, {
                Log.e(this.javaClass.simpleName, it.message.orEmpty())
            })
        }
        addEditDoneMutableLiveData.postValue(Event(Unit))
    }
}
