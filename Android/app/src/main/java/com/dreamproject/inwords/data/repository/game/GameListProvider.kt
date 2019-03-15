package com.dreamproject.inwords.data.repository.game

import io.reactivex.Single

interface GameListProvider<R> {
    fun getAll(): Single<List<R>>
}