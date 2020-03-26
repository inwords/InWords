package ru.inwords.inwords.data.source.remote

import io.reactivex.Completable
import io.reactivex.Single
import ru.inwords.inwords.game.data.bean.*
import ru.inwords.inwords.profile.data.bean.User
import ru.inwords.inwords.proto.dictionary.AddWordsReply
import ru.inwords.inwords.proto.dictionary.LookupReply
import ru.inwords.inwords.proto.dictionary.WordsReply
import ru.inwords.inwords.translation.domain.model.WordTranslation

interface WebRequestsManagerAuthorised {
    fun notifyAuthStateChanged(authorised: Boolean)

    fun getLogin(): Single<String>

    fun getAuthorisedUser(): Single<User>

    fun getGameInfos(): Single<List<GameInfoResponse>>

    fun getUserById(id: Int): Single<User>

    fun updateUser(newUser: User): Completable

    fun insertAllWords(wordTranslations: List<WordTranslation>): Single<AddWordsReply>

    fun removeAllByServerId(serverIds: List<Int>): Completable

    fun pullWords(serverIds: List<Int>): Single<WordsReply>

    fun lookup(text: String, lang: String): Single<LookupReply>

    fun getGame(gameId: Int): Single<GameResponse>

    fun getLevel(levelId: Int): Single<GameLevel>

    fun getScore(trainingEstimateRequest: TrainingEstimateRequest): Single<List<LevelScore>>

    fun addWordSetToDictionary(wordSetId: Int): Completable

    fun getWordsForTraining(): Single<List<WordTranslation>>
    fun getIdsForTraining(): Single<List<Int>>
}
