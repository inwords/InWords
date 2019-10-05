package ru.inwords.inwords.game.domain.interactor

import io.reactivex.Observable
import io.reactivex.Single
import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.game.data.bean.*
import ru.inwords.inwords.game.domain.model.GameModel
import ru.inwords.inwords.game.domain.model.GamesInfoModel
import ru.inwords.inwords.game.domain.model.LevelResultModel
import ru.inwords.inwords.translation.data.bean.WordTranslation

interface GameInteractor {
    fun getGamesInfo(forceUpdate: Boolean = false): Observable<Resource<GamesInfoModel>>
    fun getGame(gameId: Int, forceUpdate: Boolean = false): Observable<Resource<GameModel>>
    fun createCustomLevel(wordTranslations: List<WordTranslation>): Single<GameLevelInfo>
    fun getLevel(levelId: Int, forceUpdate: Boolean = false): Observable<Resource<GameLevel>>
    fun getScore(game: Game, levelResultModel: LevelResultModel): Single<Resource<LevelScore>>
    fun uploadScoresToServer(): Single<List<LevelScoreRequest>>
    fun clearCache()
}