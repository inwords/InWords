package ru.inwords.inwords.core

import ru.inwords.inwords.core.resource.Resource

abstract class BaseResourceTwoWayConverter<From : Any, To : Any> : BaseTwoWayConverter<From, To>() {
    fun convert(source: Resource<From>): Resource<To> {
        return when (source) {
            is Resource.Success -> Resource.Success(convert(source.data), source.source)
            is Resource.Loading -> Resource.Loading(source.source)
            is Resource.Error -> Resource.Error(source.message, source.throwable, source.source)
        }
    }

    fun reverse(source: Resource<To>): Resource<From> {
        return when (source) {
            is Resource.Success -> Resource.Success(reverse(source.data), source.source)
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