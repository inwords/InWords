package ru.inwords.inwords.core.validation

interface Validator<T> {
    fun validate(value: T, messageProvider: (T) -> String): ValidationResult
}

sealed class ValidationResult {
    object Success : ValidationResult()
    class Error(val message: String) : ValidationResult()
}

class SimpleValidator<T>(private val condition: (T) -> Boolean) : Validator<T> {
    override fun validate(value: T, messageProvider: (T) -> String): ValidationResult {
        return if (condition.invoke(value)) {
            ValidationResult.Success
        } else {
            ValidationResult.Error(messageProvider.invoke(value))
        }
    }
}