package ru.inwords.inwords.translation.presentation.add_edit_word

import android.annotation.SuppressLint
import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import ru.inwords.inwords.R
import ru.inwords.inwords.core.Event
import ru.inwords.inwords.core.managers.ResourceManager
import ru.inwords.inwords.core.validation.ValidationResult
import ru.inwords.inwords.domain.validators.validateWordTranslation
import ru.inwords.inwords.presentation.view_scenario.BasicViewModel
import ru.inwords.inwords.translation.data.bean.WordTranslation
import ru.inwords.inwords.translation.domain.interactor.TranslationWordsInteractor

class AddEditWordViewModel(
    private val translationWordsInteractor: TranslationWordsInteractor,
    private val resourceManager: ResourceManager
) : BasicViewModel() {
    data class ValidationState(val wordForeignState: ValidationResult, val wordNativeState: ValidationResult)

    private val addEditDoneMutableLiveData = MutableLiveData<Event<Unit>>()
    val addEditDoneLiveData: LiveData<Event<Unit>> get() = addEditDoneMutableLiveData

    private val validationMutableLiveData = MutableLiveData<ValidationState>()
    val validationLiveData: LiveData<ValidationState> get() = validationMutableLiveData

    fun onEditWordDoneHandler(word: WordTranslation, wordToEdit: WordTranslation) {
        onAddEditWordDoneHandler(word, wordToEdit)
    }

    fun onAddWordDoneHandler(word: WordTranslation) {
        onAddEditWordDoneHandler(word, null)
    }

    @SuppressLint("CheckResult")
    private fun onAddEditWordDoneHandler(word: WordTranslation, wordToEdit: WordTranslation?) {
        val validationState = validateWordTranslation(
            word,
            { resourceManager.getString(R.string.incorrect_word_input) },
            { resourceManager.getString(R.string.incorrect_word_input) }
        )

        if (validationState.wordForeignState is ValidationResult.Error || validationState.wordNativeState is ValidationResult.Error) {
            validationMutableLiveData.postValue(validationState)
        } else {
            if (word != wordToEdit) {
                val action = if (wordToEdit == null) {
                    translationWordsInteractor.addReplace(word)
                } else {
                    translationWordsInteractor.update(wordToEdit, word)
                }
                action.subscribe({
                    translationWordsInteractor.notifyDataChanged()
                }, {
                    Log.e(javaClass.simpleName, it.message.orEmpty())
                })
            }
            addEditDoneMutableLiveData.postValue(Event(Unit))
        }
    }
}
