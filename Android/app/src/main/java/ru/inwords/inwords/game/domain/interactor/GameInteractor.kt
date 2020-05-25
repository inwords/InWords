package ru.inwords.inwords.game.domain.interactor

import io.reactivex.Completable
import io.reactivex.Observable
import io.reactivex.Single
import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.game.data.entity.GameLevelEntity
import ru.inwords.inwords.game.domain.model.Game
import ru.inwords.inwords.game.domain.model.GamesInfo
import ru.inwords.inwords.game.domain.model.TrainingMetric
import ru.inwords.inwords.game.domain.model.TrainingScore

interface GameInteractor {
    fun getGamesInfo(forceUpdate: Boolean = false): Observable<Resource<GamesInfo>>
    fun getGame(gameId: Int, forceUpdate: Boolean = false): Observable<Resource<Game>>
    fun getLevel(levelId: Int, forceUpdate: Boolean = false): Observable<Resource<GameLevelEntity>>
    fun getScore(game: Game, trainingMetric: TrainingMetric): Single<Resource<TrainingScore>>
    fun uploadScoresToServer(): Single<List<TrainingScore>>
    fun addWordsToUserDictionary(gameId: Int): Completable
    fun clearCache()
}