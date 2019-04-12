package com.dreamproject.inwords.data.repository.game

import io.reactivex.Observable

interface GameEntityProvider<R> {
    fun getById(id: Int): Observable<R>
    fun getLocal(id: Int): Observable<R>
    fun enqueueStoreLocal(value: R)
}