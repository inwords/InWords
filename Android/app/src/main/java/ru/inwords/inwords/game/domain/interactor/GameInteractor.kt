package ru.inwords.inwords.game.domain.interactor

import io.reactivex.Completable
import io.reactivex.Observable
import io.reactivex.Single
import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.game.data.bean.GameLevel
import ru.inwords.inwords.game.data.bean.GameLevelInfo
import ru.inwords.inwords.game.data.bean.LevelScore
import ru.inwords.inwords.game.data.bean.LevelScoreRequest
import ru.inwords.inwords.game.domain.model.Game
import ru.inwords.inwords.game.domain.model.GamesInfo
import ru.inwords.inwords.game.domain.model.LevelResultModel
import ru.inwords.inwords.translation.data.bean.WordTranslation

interface GameInteractor {
    fun getGamesInfo(forceUpdate: Boolean = false): Observable<Resource<GamesInfo>>
    fun getGame(gameId: Int, forceUpdate: Boolean = false): Observable<Resource<Game>>
    fun createCustomLevel(wordTranslations: List<WordTranslation>): Single<GameLevelInfo>
    fun getLevel(levelId: Int, forceUpdate: Boolean = false): Observable<Resource<GameLevel>>
    fun getScore(game: Game, levelResultModel: LevelResultModel): Single<Resource<LevelScore>>
    fun uploadScoresToServer(): Single<List<LevelScoreRequest>>
    fun addWordsToUserDictionary(gameId: Int): Completable
    fun clearCache()
}