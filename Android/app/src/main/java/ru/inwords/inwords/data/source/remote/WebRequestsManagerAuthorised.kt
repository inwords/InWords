package ru.inwords.inwords.data.source.remote

import io.reactivex.Completable
import io.reactivex.Single
import ru.inwords.inwords.profile.data.bean.User
import ru.inwords.inwords.proto.classic_card_game.CardGameInfos
import ru.inwords.inwords.proto.classic_card_game.CardGameMetrics
import ru.inwords.inwords.proto.classic_card_game.LevelPoints
import ru.inwords.inwords.proto.dictionary.*
import ru.inwords.inwords.proto.profile.EmailChangeReply
import ru.inwords.inwords.proto.word_set.GetLevelWordsReply
import ru.inwords.inwords.proto.word_set.GetLevelsReply
import ru.inwords.inwords.proto.word_set.WordSetReply
import ru.inwords.inwords.translation.domain.model.WordTranslation

interface WebRequestsManagerAuthorised {
    fun notifyAuthStateChanged(authorised: Boolean)

    fun getAuthorisedUser(): Single<User>

    fun getGameInfos(): Single<WordSetReply>

    fun updateUser(newUser: User): Completable

    fun requestEmailUpdate(newEmail: String): Single<EmailChangeReply>

    fun insertAllWords(wordTranslations: List<WordTranslation>): Single<AddWordsReply>

    fun removeAllByServerId(serverIds: List<Int>): Completable

    fun pullWords(serverIds: List<Int>): Single<WordsReply>

    fun lookup(text: String, lang: String): Single<LookupReply>

    fun getLevels(wordSetId: Int): Single<GetLevelsReply>

    fun getLevelWords(levelId: Int): Single<GetLevelWordsReply>

    fun estimate(cardGameMetrics: List<CardGameMetrics.CardGameMetric>): Single<LevelPoints>
    fun save(cardGameInfos: List<CardGameInfos.CardGameInfo>): Single<LevelPoints>

    fun addWordSetToDictionary(wordSetId: Int): Completable

    fun trainingWords(): Single<TrainingReply>
    fun trainingIds(): Single<TrainingIdsReply>
}
