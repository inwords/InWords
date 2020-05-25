package ru.inwords.inwords.game.presentation.game_level

import io.reactivex.Single
import ru.inwords.inwords.NavGraphDirections
import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.game.domain.interactor.GameInteractor
import ru.inwords.inwords.game.domain.model.Game
import ru.inwords.inwords.game.domain.model.TrainingMetric
import ru.inwords.inwords.game.domain.model.TrainingScore
import ru.inwords.inwords.presentation.view_scenario.BasicViewModel

class GameEndViewModel(
    private val gameInteractor: GameInteractor
) : BasicViewModel() {

    fun onHomeButtonClicked() {
        navigateToHomeFragment()
    }

    fun onBackButtonClicked() {
        navigateOutOfGameLevel()
    }

    fun onNextButtonClicked() {
        navigateOutOfGameEndBottomShit()
    }

    fun onRetryButtonCLicked() {
        navigateOutOfGameEndBottomShit()
    }

    fun getScore(game:Game, trainingMetric: TrainingMetric): Single<Resource<TrainingScore>> {
        return gameInteractor.getScore(game, trainingMetric)
    }

    private fun navigateToHomeFragment() = navigateTo(NavGraphDirections.actionGlobalPopToStartDestination())
    private fun navigateOutOfGameLevel() = navigateTo(GameEndBottomSheetDirections.actionPopUpToGameLevelFragmentInclusive())
    private fun navigateOutOfGameEndBottomShit() = navigateTo(GameEndBottomSheetDirections.actionPop())
}
