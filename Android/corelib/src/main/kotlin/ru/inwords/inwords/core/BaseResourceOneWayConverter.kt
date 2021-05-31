package ru.inwords.inwords.core

import ru.inwords.inwords.core.resource.Resource

abstract class BaseResourceOneWayConverter<From : Any, To : Any> : BaseOneWayConverter<From, To>() {
    fun convert(source: Resource<From>): Resource<To> {
        return when (source) {
            is Resource.Success -> Resource.Success(convert(source.data), source.source)
            is Resource.Loading -> Resource.Loading(source.source)
            is Resource.Error -> Resource.Error(source.message, source.throwable, source.source)
        }
    }

    fun convertResourceList(source: Resource<List<From>>): Resource<List<To>> {
        return when (source) {
            is Resource.Success -> Resource.Success(convertList(source.data), source.source)
            is Resource.Loading -> Resource.Loading(source.source)
            is Resource.Error -> Resource.Error(source.message, source.throwable, source.source)
        }
    }
}