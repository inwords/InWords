package ru.inwords.inwords.game.domain.model

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
