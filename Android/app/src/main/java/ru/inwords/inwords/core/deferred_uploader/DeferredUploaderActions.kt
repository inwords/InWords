package ru.inwords.inwords.core.deferred_uploader

import io.reactivex.Maybe
import io.reactivex.Single
import ru.inwords.inwords.core.resource.Resource

interface DeferredUploaderActions<T : Any, R : Any, U : Any> {
    fun request(request: T, onSuccessListener: (Resource.Success<R>) -> Unit): Single<Resource<R>>
    fun tryUploadDataToRemote(): Maybe<U>
}
