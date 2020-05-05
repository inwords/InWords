package ru.inwords.inwords.game.domain.interactor

import io.reactivex.Completable
import io.reactivex.Observable
import io.reactivex.Single
import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.game.data.entity.GameLevelEntity
import ru.inwords.inwords.game.domain.model.*
import ru.inwords.inwords.translation.domain.model.WordTranslation

interface GameInteractor {
    fun getGamesInfo(forceUpdate: Boolean = false): Observable<Resource<GamesInfo>>
    fun getGame(gameId: Int, forceUpdate: Boolean = false): Observable<Resource<Game>>
    fun createCustomLevel(wordTranslations: List<WordTranslation>): Single<GameLevelInfo>
    fun getLevel(levelId: Int, forceUpdate: Boolean = false): Observable<Resource<GameLevelEntity>>
    fun getScore(game: Game, levelMetric: LevelMetric): Single<Resource<LevelScore>>
    fun uploadScoresToServer(): Single<List<LevelScore>>
    fun addWordsToUserDictionary(gameId: Int): Completable
    fun clearCache()
}