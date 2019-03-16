package com.dreamproject.inwords.data.repository.game

import io.reactivex.Single

interface GameEntityProvider<R> {
    fun getById(id: Int): Single<R>
}