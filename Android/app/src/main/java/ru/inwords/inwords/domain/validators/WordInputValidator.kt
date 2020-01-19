package ru.inwords.inwords.domain.validators

import ru.inwords.inwords.core.validation.SimpleValidator
import ru.inwords.inwords.translation.data.bean.WordTranslation
import ru.inwords.inwords.translation.presentation.add_edit_word.AddEditWordViewModel

val wordInputValidator = SimpleValidator<String> { it.isNotBlank() }

fun validateWordTranslation(
    wordTranslation: WordTranslation,
    foreignMessageProvider: (String) -> String,
    nativeMessageProvider: (String) -> String
): AddEditWordViewModel.ValidationState {
    return AddEditWordViewModel.ValidationState(
        wordInputValidator.validate(wordTranslation.wordForeign, foreignMessageProvider),
        wordInputValidator.validate(wordTranslation.wordNative, nativeMessageProvider)
    )
}