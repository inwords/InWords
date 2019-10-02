package ru.inwords.inwords.domain.interactor.game

import io.reactivex.Observable
import io.reactivex.Single
import ru.inwords.inwords.core.Resource
import ru.inwords.inwords.data.dto.WordTranslation
import ru.inwords.inwords.data.dto.game.*
import ru.inwords.inwords.domain.model.GameModel
import ru.inwords.inwords.domain.model.GamesInfoModel
import ru.inwords.inwords.domain.model.LevelResultModel

interface GameInteractor {
    fun getGamesInfo(forceUpdate: Boolean = false): Observable<Resource<GamesInfoModel>>
    fun getGame(gameId: Int, forceUpdate: Boolean = false): Observable<Resource<GameModel>>
    fun createCustomLevel(wordTranslations: List<WordTranslation>): Single<GameLevelInfo>
    fun getLevel(levelId: Int, forceUpdate: Boolean = false): Observable<Resource<GameLevel>>
    fun getScore(game: Game, levelResultModel: LevelResultModel): Single<Resource<LevelScore>>
    fun uploadScoresToServer(): Single<List<LevelScoreRequest>>
    fun clearCache()
}