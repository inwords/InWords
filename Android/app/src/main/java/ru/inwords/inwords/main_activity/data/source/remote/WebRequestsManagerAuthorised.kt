package ru.inwords.inwords.main_activity.data.source.remote

import io.reactivex.Completable
import io.reactivex.Single
import ru.inwords.inwords.proto.dictionary.*
import ru.inwords.inwords.proto.profile.EmailChangeReply
import ru.inwords.inwords.proto.profile.ProfileReply
import ru.inwords.inwords.proto.word_set.*
import ru.inwords.inwords.translation.domain.model.WordTranslation

interface WebRequestsManagerAuthorised {
    fun notifyAuthStateChanged(authorised: Boolean)

    fun getAuthorisedUser(): Single<ProfileReply>

    fun getGameInfos(): Single<WordSetReply>

    fun updateUser(newNickName:String): Completable

    fun requestEmailUpdate(newEmail: String): Single<EmailChangeReply>

    fun insertAllWords(wordTranslations: List<WordTranslation>): Single<AddWordsReply>

    fun removeAllByServerId(serverIds: List<Int>): Completable

    fun pullWords(serverIds: List<Int>): Single<WordsReply>

    fun lookup(text: String, lang: String): Single<LookupReply>

    fun getLevels(wordSetId: Int): Single<GetLevelsReply>

    fun getLevelWords(levelId: Int): Single<GetLevelWordsReply>

    fun estimate(cardGameMetrics: List<TrainingDataRequest.Training>): Single<TrainingScoreReply>

    fun addWordSetToDictionary(wordSetId: Int): Completable

    fun trainingWords(): Single<TrainingReply>
    fun trainingIds(): Single<TrainingIdsReply>
}
