package ru.inwords.inwords.translation.presentation.add_edit_word

import android.annotation.SuppressLint
import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import io.reactivex.Single
import io.reactivex.subjects.PublishSubject
import ru.inwords.inwords.R
import ru.inwords.inwords.authorisation.validators.WordTranslationValidationState
import ru.inwords.inwords.authorisation.validators.validateWordTranslation
import ru.inwords.inwords.core.Event
import ru.inwords.inwords.core.managers.ResourceManager
import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.core.resource.Source
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import ru.inwords.inwords.core.validation.ValidationResult
import ru.inwords.inwords.presentation.view_scenario.BasicViewModel
import ru.inwords.inwords.translation.converter.DefinitionsToStringsConverter
import ru.inwords.inwords.translation.domain.interactor.TranslationWordsInteractor
import ru.inwords.inwords.translation.domain.model.Definition
import ru.inwords.inwords.translation.domain.model.LookupDirection
import ru.inwords.inwords.translation.domain.model.WordTranslation
import java.util.concurrent.TimeUnit

class AddEditWordViewModel(
    private val translationWordsInteractor: TranslationWordsInteractor,
    private val resourceManager: ResourceManager
) : BasicViewModel() {
    private val addEditDoneMutableLiveData = MutableLiveData<Event<Unit>>()
    val addEditDoneLiveData: LiveData<Event<Unit>> get() = addEditDoneMutableLiveData

    private val validationMutableLiveData = MutableLiveData<WordTranslationValidationState>()
    val validationLiveData: LiveData<WordTranslationValidationState> get() = validationMutableLiveData

    private val translationOutputConverter = DefinitionsToStringsConverter()
    private val wordToTranslateSubject = PublishSubject.create<String>()
    private val translationMutableLiveData = MutableLiveData<Resource<List<String>>>()
    val translationLiveData: LiveData<Resource<List<String>>> get() = translationMutableLiveData

    init {
        wordToTranslateSubject
            .doOnNext { translationMutableLiveData.postValue(Resource.Loading()) }
            .debounce(300, TimeUnit.MILLISECONDS)
            .observeOn(SchedulersFacade.io())
            .switchMapSingle { text ->
                if (text.isNotBlank()) {
                    translationWordsInteractor.lookup(text, LookupDirection.EN_RU)
                        .subscribeOn(SchedulersFacade.io())
                        .map { Resource.Success(it, Source.NETWORK) as Resource<List<Definition>> }
                        .onErrorReturn { Resource.Error(it.message, it, Source.NETWORK) }
                } else {
                    Single.just(Resource.Success<List<Definition>>(emptyList()))
                }
            }
            .subscribe({
                val result = translationOutputConverter.convert(it)
                translationMutableLiveData.postValue(result)
            }, {
                Log.e(javaClass.simpleName, it.message.orEmpty())
                translationMutableLiveData.postValue(Resource.Error(it.message, it))
            })
            .autoDispose()
    }

    fun onEditWordDone(word: WordTranslation, wordToEdit: WordTranslation) {
        onAddEditWord(word, wordToEdit)
    }

    fun onAddWordDone(word: WordTranslation) {
        onAddEditWord(word, null)
    }

    fun askForTranslation(text: String) {
        wordToTranslateSubject.onNext(text)
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
            if (word.wordNative != wordToEdit?.wordNative || word.wordForeign != wordToEdit.wordForeign) {
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
