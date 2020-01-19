package ru.inwords.inwords.domain.validators

import ru.inwords.inwords.core.validation.SimpleValidator
import ru.inwords.inwords.core.validation.ValidationResult
import ru.inwords.inwords.profile.data.bean.UserCredentials

val emailInputValidator = SimpleValidator<String> { it.trim().length >= 3 } //TODO normal validation
val passwordInputValidator = SimpleValidator<String> { it.isNotBlank() } //TODO normal validation

fun validateUserCredentials(
    userCredentials: UserCredentials,
    emailMessageProvider: (String) -> String,
    passwordMessageProvider: (String) -> String
): UserCredentialsValidationState {
    return UserCredentialsValidationState(
        emailInputValidator.validate(userCredentials.email, emailMessageProvider),
        passwordInputValidator.validate(userCredentials.password, passwordMessageProvider)
    )
}

data class UserCredentialsValidationState(
    val emailState: ValidationResult,
    val passwordState: ValidationResult
)

fun validateUserCredentialsWithConfirmation(
    userCredentials: UserCredentials,
    passwordConfirmation: String,
    emailMessageProvider: (String) -> String,
    passwordMessageProvider: (String) -> String,
    passwordConfirmationMessageProvider: (String) -> String
): UserCredentialsWithConfirmationValidationState {
    return UserCredentialsWithConfirmationValidationState(
        emailInputValidator.validate(userCredentials.email, emailMessageProvider),
        passwordInputValidator.validate(userCredentials.password, passwordMessageProvider),
        SimpleValidator<String> { it == userCredentials.password }.validate(passwordConfirmation, passwordConfirmationMessageProvider)
    )
}

data class UserCredentialsWithConfirmationValidationState(
    val emailState: ValidationResult,
    val passwordState: ValidationResult,
    val passwordConfirmationState: ValidationResult
)