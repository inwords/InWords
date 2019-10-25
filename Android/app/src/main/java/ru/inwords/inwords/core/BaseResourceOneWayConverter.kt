package ru.inwords.inwords.core

import ru.inwords.inwords.core.resource.Resource

abstract class BaseResourceOneWayConverter<From : Any, To : Any> : BaseOneWayConverter<Resource<From>, Resource<To>>() {
    override fun convert(source: Resource<From>): Resource<To> {
        return when (source) {
            is Resource.Success -> Resource.Success(convertSuccess(source.data))
            is Resource.Loading -> Resource.Loading()
            is Resource.Error -> Resource.Error(source.message, source.throwable)
        }
    }

    abstract fun convertSuccess(source: From): To
}