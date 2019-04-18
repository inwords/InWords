package com.dreamproject.inwords.presentation.viewScenario.octoGame

import com.dreamproject.inwords.presentation.viewScenario.octoGame.gameLevel.GameEndBottomSheet
import com.dreamproject.inwords.presentation.viewScenario.octoGame.gameLevel.GameLevelFragment
import com.dreamproject.inwords.presentation.viewScenario.octoGame.gameLevels.GameLevelsFragment
import com.dreamproject.inwords.presentation.viewScenario.octoGame.games.GamesFragment
import dagger.Module
import dagger.android.ContributesAndroidInjector

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