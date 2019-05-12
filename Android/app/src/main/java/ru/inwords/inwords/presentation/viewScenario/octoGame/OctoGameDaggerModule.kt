package ru.inwords.inwords.presentation.viewScenario.octoGame

import dagger.Module
import dagger.android.ContributesAndroidInjector
import ru.inwords.inwords.presentation.viewScenario.octoGame.gameLevel.GameEndBottomSheet
import ru.inwords.inwords.presentation.viewScenario.octoGame.gameLevel.GameLevelFragment
import ru.inwords.inwords.presentation.viewScenario.octoGame.gameLevels.GameLevelsFragment
import ru.inwords.inwords.presentation.viewScenario.octoGame.games.GamesFragment

@Module
abstract class OctoGameDaggerModule {
    @ContributesAndroidInjector
    internal abstract fun gameLevelFragmentInjector(): GameLevelFragment

    @ContributesAndroidInjector
    internal abstract fun gameEndBottomSheetInjector(): GameEndBottomSheet

    @ContributesAndroidInjector
    internal abstract fun gameLevelsFragmentInjector(): GameLevelsFragment

    @ContributesAndroidInjector
    internal abstract fun gamesFragmentInjector(): GamesFragment
}