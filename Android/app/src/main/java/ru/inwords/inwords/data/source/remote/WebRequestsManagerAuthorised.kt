package ru.inwords.inwords.data.source.remote

import io.reactivex.Completable
import io.reactivex.Single
import ru.inwords.inwords.game.data.bean.*
import ru.inwords.inwords.profile.data.bean.User
import ru.inwords.inwords.translation.data.bean.EntityIdentificator
import ru.inwords.inwords.translation.data.bean.WordTranslation
import ru.inwords.inwords.translation.data.sync.PullWordsAnswer

interface WebRequestsManagerAuthorised {
    fun notifyAuthStateChanged(authorised: Boolean)

    fun getLogin(): Single<String>

    fun getAuthorisedUser(): Single<User>

    fun getGameInfos(): Single<List<GameInfoResponse>>

    fun getUserEmail(): Single<String>

    fun getUserById(id: Int): Single<User>

    fun updateUser(newUser: User): Completable

    fun insertAllWords(wordTranslations: List<WordTranslation>): Single<List<EntityIdentificator>>

    fun removeAllServerIds(serverIds: List<Int>): Single<Int>

    fun pullWords(serverIds: List<Int>): Single<PullWordsAnswer>

    fun getGame(gameId: Int): Single<GameResponse>

    fun getLevel(levelId: Int): Single<GameLevel>

    fun getScore(trainingEstimateRequest: TrainingEstimateRequest): Single<List<LevelScore>>

    fun addWordsToUserDictionary(gameId: Int): Completable

    fun getWordsForTraining(): Single<List<WordTranslation>>

    fun getIdsForTraining(): Single<List<Int>>
}
