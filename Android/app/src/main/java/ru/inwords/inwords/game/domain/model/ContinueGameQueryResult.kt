package ru.inwords.inwords.game.domain.model

import ru.inwords.inwords.game.data.bean.GameLevelInfo

sealed class ContinueGameQueryResult {
    data class NextLevelInfo(
        val game: Game,
        val levelInfo: GameLevelInfo,
        val isLast: Boolean
    ) : ContinueGameQueryResult()

    data class NextGameInfo(
        val nextGameInfo: GameInfo
    ) : ContinueGameQueryResult()

    object NoMoreGames : ContinueGameQueryResult()
}
