package ru.inwords.inwords.data.source.remote

import io.reactivex.Completable
import io.reactivex.Single
import ru.inwords.inwords.data.dto.EntityIdentificator
import ru.inwords.inwords.data.dto.User
import ru.inwords.inwords.data.dto.WordTranslation
import ru.inwords.inwords.data.dto.game.*
import ru.inwords.inwords.data.sync.PullWordsAnswer

interface WebRequestsManagerAuthorised {
    fun notifyAuthStateChanged(authorised: Boolean)

    fun getLogin(): Single<String>

    fun getAuthorisedUser(): Single<User>

    fun getGameInfos(): Single<List<GameInfo>>

    fun getUserEmail(): Single<String>

    fun getUserById(id: Int): Single<User>

    fun updateUser(newUser: User): Completable

    fun insertAllWords(wordTranslations: List<WordTranslation>): Single<List<EntityIdentificator>>

    fun removeAllServerIds(serverIds: List<Int>): Single<Int>

    fun pullWords(serverIds: List<Int>): Single<PullWordsAnswer>

    fun getGame(gameId: Int): Single<Game>

    fun getLevel(levelId: Int): Single<GameLevel>

    fun getScore(levelScoreRequest: LevelScoreRequest): Single<LevelScore>

    fun uploadScore(levelScoreRequests: List<LevelScoreRequest>): Single<Boolean>
}
