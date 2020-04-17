package ru.inwords.inwords.authorisation.validators

import ru.inwords.inwords.core.validation.SimpleValidator
import ru.inwords.inwords.core.validation.ValidationResult
import ru.inwords.inwords.translation.domain.model.WordTranslation

val wordInputValidator = SimpleValidator<String> { it.isNotBlank() }

fun validateWordTranslation(
    wordTranslation: WordTranslation,
    foreignMessageProvider: (String) -> String,
    nativeMessageProvider: (String) -> String
): WordTranslationValidationState {
    return WordTranslationValidationState(
        wordInputValidator.validate(wordTranslation.wordForeign, foreignMessageProvider),
        wordInputValidator.validate(wordTranslation.wordNative, nativeMessageProvider)
    )
}

data class WordTranslationValidationState(val wordForeignState: ValidationResult, val wordNativeState: ValidationResult)