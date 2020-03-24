package ru.inwords.inwords.translation.presentation.add_edit_word

import android.annotation.SuppressLint
import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import ru.inwords.inwords.R
import ru.inwords.inwords.authorisation.validators.WordTranslationValidationState
import ru.inwords.inwords.authorisation.validators.validateWordTranslation
import ru.inwords.inwords.core.Event
import ru.inwords.inwords.core.managers.ResourceManager
import ru.inwords.inwords.core.validation.ValidationResult
import ru.inwords.inwords.presentation.view_scenario.BasicViewModel
import ru.inwords.inwords.translation.domain.interactor.TranslationWordsInteractor
import ru.inwords.inwords.translation.domain.model.WordTranslation

class AddEditWordViewModel(
    private val translationWordsInteractor: TranslationWordsInteractor,
    private val resourceManager: ResourceManager
) : BasicViewModel() {
    private val addEditDoneMutableLiveData = MutableLiveData<Event<Unit>>()
    val addEditDoneLiveData: LiveData<Event<Unit>> get() = addEditDoneMutableLiveData

    private val validationMutableLiveData = MutableLiveData<WordTranslationValidationState>()
    val validationLiveData: LiveData<WordTranslationValidationState> get() = validationMutableLiveData

    fun onEditWordDone(word: WordTranslation, wordToEdit: WordTranslation) {
        onAddEditWord(word, wordToEdit)
    }

    fun onAddWordDone(word: WordTranslation) {
        onAddEditWord(word, null)
    }

    @SuppressLint("CheckResult")
    private fun onAddEditWord(word: WordTranslation, wordToEdit: WordTranslation?) {
        val validationState = validateWordTranslation(
            word,
            { resourceManager.getString(R.string.incorrect_input_word) },
            { resourceManager.getString(R.string.incorrect_input_word) }
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
            popBackToTranslationMain()
        }
    }

    private fun popBackToTranslationMain() {
        navigateTo(AddEditWordFragmentDirections.actionAddEditWordFragmentPop())
    }
}
