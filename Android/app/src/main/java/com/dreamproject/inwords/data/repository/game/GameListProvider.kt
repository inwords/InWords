package com.dreamproject.inwords.data.repository.game

import io.reactivex.Observable

interface GameListProvider<R> {
    fun getAll(): Observable<List<R>>
    fun getLocal(): Observable<List<R>>
    fun enqueueStoreLocal(value: List<R>)
}