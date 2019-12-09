package ru.inwords.inwords.core.deferred_uploader

import io.reactivex.Single
import ru.inwords.inwords.core.resource.Resource

interface DeferredUploaderActions<T : Any, R : Any> {
    fun request(request: T, onSuccessListener: (Resource.Success<R>) -> Unit): Single<Resource<R>>
    fun tryUploadDataToRemote(): Single<List<T>>
}
