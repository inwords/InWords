package ru.inwords.inwords.game.data.converter

import ru.inwords.inwords.core.BaseOneWayConverter
import ru.inwords.inwords.game.domain.model.TrainingScore
import ru.inwords.inwords.proto.word_set.TrainingScoreReply

class TrainingScoreConverter : BaseOneWayConverter<TrainingScoreReply.TrainigScore, TrainingScore>() {
    override fun convert(source: TrainingScoreReply.TrainigScore): TrainingScore {
        return TrainingScore(
            levelId = source.gameLevelId,
            score = source.score,
            audioScore = source.audio.score,
            closedGameScore = source.closedCards.score
        )
    }
}